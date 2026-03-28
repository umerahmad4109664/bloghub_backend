const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate excerpt from content if not provided
postSchema.pre('save', function (next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200) + '...';
  }
  next();
});

// Index for search functionality
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Post', postSchema);
