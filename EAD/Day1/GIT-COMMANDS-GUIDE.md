# 📚 Complete Git Commands Guide for Learning

## Table of Contents
1. [Git Basics](#git-basics)
2. [Configuration](#configuration)
3. [Creating & Cloning Repositories](#creating--cloning-repositories)
4. [Staging & Committing](#staging--committing)
5. [Branching](#branching)
6. [Merging](#merging)
7. [Viewing History](#viewing-history)
8. [Remote Repositories](#remote-repositories)
9. [Undoing Changes](#undoing-changes)
10. [Git Workflows](#git-workflows)

---

## Git Basics

Git is a **version control system** that tracks changes to your code.

### What is Git?
- Tracks file changes over time
- Allows collaboration
- Maintains history (commit history)
- Enables branching and merging

### Key Concepts
- **Repository (Repo)**: Folder containing your project and git history
- **Commit**: Snapshot of your code at a specific time
- **Branch**: Independent line of development
- **Merge**: Combining two branches
- **Remote**: Repository hosted on a server (like GitHub)

---

## Configuration

Set up Git with your identity before making commits.

```bash
# View all configuration
git config --list

# Set global user name
git config --global user.name "Your Name"

# Set global user email
git config --global user.email "your.email@example.com"

# Set editor (for commit messages)
git config --global core.editor "nano"

# View specific config
git config user.name
```

### One-Time Setup
```bash
git config --global user.name "John Doe"
git config --global user.email "john@example.com"
```

---

## Creating & Cloning Repositories

### Initialize a New Repository
```bash
# Create a new folder
mkdir my-project
cd my-project

# Initialize empty git repo
git init

# View hidden .git folder (contains all git data)
ls -la
```

### Clone Existing Repository
```bash
# Clone from GitHub (HTTPS)
git clone https://github.com/username/repository.git

# Clone from GitHub (SSH)
git clone git@github.com:username/repository.git

# Clone into specific folder
git clone https://github.com/username/repository.git my-folder

# Clone only latest version (no history)
git clone --depth 1 https://github.com/username/repository.git
```

---

## Staging & Committing

### Check Status
```bash
# See what has changed
git status

# Short status (compact format)
git status -s
```

### Staging Changes
```bash
# Stage single file
git add file.js

# Stage all changes in current directory
git add .

# Stage all changes in entire repo
git add -A

# Stage with interactive prompt (choose which changes)
git add -p

# Unstage file
git reset file.js

# Unstage all
git reset
```

### Committing
```bash
# Commit with message
git commit -m "Add user authentication feature"

# Commit all tracked files (skipping staging)
git commit -a -m "Update code"

# Commit with detailed message
git commit -m "Title: Add authentication

- Implement login functionality
- Add password validation
- Create user session management"

# Amend last commit (add more changes)
git commit --amend

# Amend commit message only
git commit --amend -m "New message"
```

### Best Practices for Commit Messages
```
✓ Good:   "Fix login button not responding on mobile"
✗ Bad:    "fixed stuff"

✓ Good:   "Refactor database queries for performance"
✗ Bad:    "updates"

✓ Good:   "Add dark mode toggle to settings"
✗ Bad:    "dark mode"
```

---

## Branching

Branches allow parallel development.

### List Branches
```bash
# List local branches
git branch

# List remote branches
git branch -r

# List all branches (local + remote)
git branch -a

# List with last commit message
git branch -v
```

### Create & Switch Branches
```bash
# Create new branch
git branch feature-login

# Switch to branch
git checkout feature-login

# Create and switch in one command
git checkout -b feature-login

# Create and switch (newer syntax)
git switch -c feature-login

# Switch to existing branch
git switch main

# Delete local branch
git branch -d feature-login

# Force delete branch
git branch -D feature-login
```

### Branch Naming Conventions
```
feature/user-authentication
bugfix/fix-login-error
hotfix/urgent-payment-issue
refactor/database-queries
docs/update-readme
test/add-unit-tests
```

### Rename Branch
```bash
# Rename current branch
git branch -m new-name

# Rename specific branch
git branch -m old-name new-name
```

---

## Merging

Combine changes from one branch into another.

### Basic Merge
```bash
# Switch to main branch
git checkout main

# Merge feature branch into main
git merge feature-login

# Merge with commit message
git merge feature-login -m "Merge login feature"
```

### Types of Merges

#### Fast-Forward Merge
```bash
# When main hasn't changed since branch was created
# Direct fast-forward merge
git merge feature-branch
```

#### 3-Way Merge
```bash
# When both branches have changes
# Creates merge commit combining both
git merge feature-branch
```

### Handling Merge Conflicts
```bash
# Conflict markers appear in files:
# <<<<<<< HEAD
#   Your change
# =======
#   Their change
# >>>>>>> feature-branch

# After resolving conflicts manually:
git add resolved-file.js
git commit -m "Resolve merge conflicts"

# Cancel merge if something goes wrong
git merge --abort
```

### Squash Merge (Combine Commits)
```bash
# Merge all commits from branch as single commit
git merge --squash feature-branch
git commit -m "Add feature"
```

---

## Viewing History

### View Commits
```bash
# View commit history
git log

# One line per commit
git log --oneline

# Show last 5 commits
git log -5

# Show commits from specific author
git log --author="John Doe"

# Show commits with changes
git log -p

# Show commits with stats (files changed, lines added/removed)
git log --stat

# Pretty format
git log --oneline --graph --all --decorate
```

### View Specific Commit
```bash
# Show specific commit details
git show abc1234

# Show commit changes
git show abc1234:file.js

# Show file at specific commit
git show main:file.js
```

### Diff (Compare Changes)
```bash
# See unstaged changes
git diff

# See staged changes
git diff --staged

# Compare two branches
git diff main feature-login

# Compare specific file
git diff main feature-login -- path/to/file.js

# Compare with specific commit
git diff abc1234 file.js
```

### Blame (Who Changed What)
```bash
# See who last modified each line
git blame file.js

# Show specific lines
git blame -L 10,20 file.js
```

---

## Remote Repositories

Working with GitHub or GitLab repositories.

### View Remotes
```bash
# List remote repositories
git remote

# List with URLs
git remote -v

# Show remote details
git remote show origin
```

### Add/Remove Remotes
```bash
# Add remote repository
git remote add origin https://github.com/username/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin github

# Change remote URL
git remote set-url origin https://github.com/username/new-repo.git
```

### Push (Upload Your Changes)
```bash
# Push current branch to remote
git push origin main

# Push all branches
git push origin --all

# Push with tracking (remembers this upstream)
git push -u origin feature-login

# Push specific branch
git push origin feature-login

# Force push (use carefully!)
git push -f origin main

# Push tags
git push origin --tags
```

### Pull (Download & Merge Changes)
```bash
# Fetch and merge from remote
git pull origin main

# Same as: git fetch origin && git merge origin/main

# Pull specific branch
git pull origin feature-login

# Pull with rebase (different history style)
git pull --rebase origin main
```

### Fetch (Download Without Merge)
```bash
# Download changes without merging
git fetch origin

# Fetch specific branch
git fetch origin main

# Fetch all remotes
git fetch --all

# Delete remote branches that no longer exist
git fetch -p
```

---

## Undoing Changes

### Before Staging
```bash
# Discard changes in working directory
git restore file.js

# Discard changes in all files
git restore .

# Discard changes in all files (older syntax)
git checkout -- file.js
```

### After Staging
```bash
# Unstage file (keep changes in working directory)
git restore --staged file.js

# Older syntax
git reset file.js
```

### After Committing
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert specific commit (creates new commit undoing it)
git revert abc1234

# View what would be reset
git reset --soft HEAD~1 --dry-run
```

### Revert Commits
```bash
# Create new commit that undoes a commit
git revert abc1234

# Revert multiple commits
git revert abc1234..def5678

# Revert without auto-committing
git revert --no-commit abc1234
```

---

## Git Workflows

### Feature Branch Workflow
```bash
# 1. Create feature branch from main
git checkout -b feature/new-feature
git switch -c feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to remote
git push -u origin feature/new-feature

# 4. Create Pull Request on GitHub

# 5. After approval, merge on GitHub

# 6. Delete branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Sync With Upstream (Contributing to Others' Projects)
```bash
# 1. Fork repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/repository.git

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/repository.git

# 4. Fetch upstream changes
git fetch upstream

# 5. Merge upstream into your main
git merge upstream/main

# 6. Push to your fork
git push origin main
```

### Stashing (Temporary Storage)
```bash
# Save changes temporarily
git stash

# List stashed changes
git stash list

# Restore stashed changes
git stash pop

# Restore specific stash
git stash apply stash@{0}

# Drop stash
git stash drop
```

---

## Common Workflows: Step by Step

### Workflow 1: Starting a New Project
```bash
mkdir my-project
cd my-project
git init
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"
git remote add origin https://github.com/username/my-project.git
git branch -M main
git push -u origin main
```

### Workflow 2: Creating a Feature
```bash
git checkout -b feature/user-login
# Make changes
git add .
git commit -m "Implement user login"
git push -u origin feature/user-login
# Create Pull Request on GitHub
```

### Workflow 3: Fixing a Bug
```bash
git checkout -b bugfix/login-error
# Fix the bug
git add .
git commit -m "Fix: Login button not working"
git push origin bugfix/login-error
# Create Pull Request, merge after review
```

### Workflow 4: Synchronizing With Remote
```bash
git fetch origin          # Get latest changes
git merge origin/main     # Merge them
# Or: git pull origin main (combines above two)
```

### Workflow 5: Undoing a Mistake
```bash
# Committed wrong file
git reset --soft HEAD~1
git restore --staged wrong-file.js
git add correct-file.js
git commit -m "Correct commit"
```

---

## Useful Git Aliases

```bash
# Create shortcuts for common commands
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'

# Now you can use:
git st          # instead of git status
git co main     # instead of git checkout main
git visual      # instead of long git log command
```

---

## Git Tips & Tricks

### View Detailed Git Config
```bash
git config --list --show-origin
```

### Create a `.gitignore` File
```bash
# Create file that ignores certain files
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore

git add .gitignore
git commit -m "Add gitignore"
```

### Tag Releases
```bash
# Create tag for release
git tag v1.0.0
git push origin v1.0.0

# List tags
git tag

# Delete tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

### Cherry-pick (Apply Specific Commit)
```bash
# Apply specific commit to current branch
git cherry-pick abc1234

# Apply multiple commits
git cherry-pick abc1234..def5678
```

---

## Troubleshooting

### Accidentally Committed to Wrong Branch
```bash
git reset --soft HEAD~1
git stash
git checkout correct-branch
git stash pop
git commit -m "Fix: Correct commit"
```

### Accidentally Deleted Branch
```bash
git reflog
git checkout -b recover-branch abc1234
```

### Need to Update Local main with Remote
```bash
git fetch origin
git reset --hard origin/main
```

---

## Quick Reference Card

| Command | Purpose |
|---------|---------|
| `git init` | Initialize new repository |
| `git clone <url>` | Clone repository |
| `git status` | Check status |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Create commit |
| `git branch` | List branches |
| `git checkout -b <branch>` | Create and switch branch |
| `git merge <branch>` | Merge branch |
| `git push origin <branch>` | Push to remote |
| `git pull origin <branch>` | Pull from remote |
| `git log --oneline` | View commit history |
| `git reset --hard HEAD~1` | Undo last commit |
| `git stash` | Temporarily save changes |

---

## Next Steps

1. Practice on a local repository
2. Create GitHub account and try pushing
3. Clone an open-source project and explore history
4. Contribute to open-source using Git workflow
5. Learn advanced topics: rebase, cherry-pick, bisect

Good luck with your Git learning! 🚀
