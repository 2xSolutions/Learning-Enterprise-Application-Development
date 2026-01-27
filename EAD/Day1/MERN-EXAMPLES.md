# 🛠️ MERN Stack Practical Examples

This document contains practical code examples for each part of the MERN stack.

## Part 1: MongoDB + Mongoose (Database)

### User Model Example

```javascript
// models/User.js
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: 50
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    age: {
      type: Number,
      min: 0,
      max: 120
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
```

### Post Model Example

```javascript
// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to User model
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [
      {
        text: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    tags: [String],
    published: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('Post', postSchema);
```

---

## Part 2: Express.js (Backend)

### Setup Express Server

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### User Controller

```javascript
// controllers/userController.js
const User = require('../models/User');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE user
exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email required' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Create user
    const newUser = new User({ name, email, age });
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, age, isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age, isActive },
      { new: true, runValidators: true }  // Return updated doc
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### User Routes

```javascript
// routes/users.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

### Post Controller

```javascript
// controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

// GET all posts (with author details)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')  // Get author details
      .sort({ createdAt: -1 });  // Most recent first
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('comments.userId', 'name email');
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    
    // Validate author exists
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ error: 'Author not found' });
    }
    
    const newPost = new Post({
      title,
      content,
      author,
      tags: tags || []
    });
    
    await newPost.save();
    await newPost.populate('author', 'name email');
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE post
exports.updatePost = async (req, res) => {
  try {
    const { title, content, tags, published } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        tags,
        published,
        updatedAt: Date.now()
      },
      { new: true }
    ).populate('author', 'name email');
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADD comment to post
exports.addComment = async (req, res) => {
  try {
    const { text, userId } = req.body;
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: { text, userId }
        }
      },
      { new: true }
    ).populate('comments.userId', 'name email');
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LIKE post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },  // Increment likes by 1
      { new: true }
    );
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Part 3: React (Frontend)

### Custom Hook for Fetching Data

```javascript
// hooks/useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

### User List Component

```javascript
// components/UserList.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users List</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age || 'N/A'}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
```

### User Form Component

```javascript
// components/UserForm.js
import { useState } from 'react';
import axios from 'axios';

function UserForm({ onUserCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/users', {
        ...formData,
        age: formData.age ? parseInt(formData.age) : null
      });
      
      setSuccess(true);
      setFormData({ name: '', email: '', age: '' });
      
      // Notify parent component
      if (onUserCreated) {
        onUserCreated(response.data);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New User</h2>
      
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {success && <div style={{ color: 'green' }}>User created successfully!</div>}
      
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}

export default UserForm;
```

### Posts Component with Comments

```javascript
// components/PostsList.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like`);
      
      // Update post in state
      setPosts(posts.map(post =>
        post._id === postId ? response.data : post
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author?.name}</p>
          <p><strong>Likes:</strong> {post.likes}</p>
          
          <button onClick={() => handleLike(post._id)}>
            👍 Like ({post.likes})
          </button>
          
          <div>
            <h4>Comments ({post.comments?.length || 0})</h4>
            {post.comments?.map((comment, index) => (
              <div key={index} style={{ marginLeft: '20px', borderLeft: '2px solid #ccc', padding: '5px' }}>
                <p><strong>{comment.userId?.name}:</strong> {comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
```

---

## Complete Flow: Creating and Fetching Data

### 1. Frontend sends data
```javascript
const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};
```

### 2. Backend receives and saves
```javascript
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});
```

### 3. MongoDB stores the document
```
User Collection:
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  createdAt: 2024-01-20T10:00:00Z
}
```

### 4. Frontend fetches and displays
```javascript
const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    const data = await fetch('/api/users').then(r => r.json());
    setUsers(data);
  };
  fetchUsers();
}, []);
```

---

## Summary

- **MongoDB**: Stores data as documents
- **Express**: Handles HTTP requests and routes
- **React**: Displays UI and manages state
- **Node.js**: Runs JavaScript on backend

This creates a full-stack JavaScript application!
