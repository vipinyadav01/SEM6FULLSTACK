const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required for review']
  },
  name: {
    type: String,
    required: [true, 'Name is required for review'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be an integer value'
    }
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters long'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    minlength: [20, 'Description must be at least 20 characters long'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
    set: v => parseFloat(v.toFixed(2)) // Ensure 2 decimal places
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Electronics', 'Clothing', 'Home', 'Books', 'Other'],
      message: '{VALUE} is not a valid category'
    }
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be an integer value'
    }
  },
  imageUrl: {
    type: String,
    default: '/images/default-product.jpg',
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png|webp)$/i.test(v);
      },
      message: 'Image URL must be a valid image file (jpg, jpeg, png, webp)'
    }
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5'],
    set: v => parseFloat(v.toFixed(1)) // Store with 1 decimal place
  },
  numReviews: {
    type: Number,
    default: 0,
    min: [0, 'Review count cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update timestamps on review changes
productSchema.pre('save', function(next) {
  if (this.isModified('reviews')) {
    this.updatedAt = Date.now();
  }
  next();
});

// Improved average rating calculation
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
    return;
  }

  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.rating = parseFloat((sum / this.reviews.length).toFixed(1));
  this.numReviews = this.reviews.length;
};

// Add text index for search functionality
productSchema.index({
  name: 'text',
  description: 'text',
  category: 'text'
});

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Virtual for inStock status
productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

// Query helper for in-stock products
productSchema.query.inStock = function() {
  return this.where('stock').gt(0);
};

// Query helper for products by category
productSchema.query.byCategory = function(category) {
  return this.where('category').equals(category);
};

// Static method to get average rating by category
productSchema.statics.getAverageRatingByCategory = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$category',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    },
    { $sort: { avgRating: -1 } }
  ]);
};

module.exports = mongoose.model('Product', productSchema);