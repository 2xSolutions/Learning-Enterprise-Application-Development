# 🎯 Git Practice Exercises

Use these exercises to practice git commands. Create a practice repository and try each exercise.

## Exercise 1: Initialize & Basic Commands

```bash
# Create practice folder
mkdir git-practice
cd git-practice

# Initialize git
git init

# Check status (should be empty)
git status

# Create a file
echo "Hello World" > hello.txt

# Check status (should show untracked file)
git status

# Stage the file
git add hello.txt

# Check status (should show staged)
git status

# Commit
git commit -m "Add hello.txt"

# View history
git log
```

---

## Exercise 2: Making Multiple Commits

```bash
# Create more files
echo "# My Project" > README.md
git add README.md
git commit -m "Add README"

# Modify hello.txt
echo "Hello World Updated" > hello.txt
git add hello.txt
git commit -m "Update hello.txt"

# View full history
git log --oneline
git log -p

# View specific commit
git show HEAD
```

---

## Exercise 3: Branching

```bash
# Create feature branch
git branch feature/new-feature
git checkout feature/new-feature

# Or combined: git checkout -b feature/new-feature

# Make changes on feature branch
echo "New content" > feature.txt
git add feature.txt
git commit -m "Add feature"

# Check current branch
git branch

# View branches with last commit
git branch -v

# Switch back to main
git checkout main

# Notice feature.txt is gone (it's on feature branch)
ls -la

# Switch to feature branch
git checkout feature/new-feature

# feature.txt is here
ls -la
```

---

## Exercise 4: Merging Branches

```bash
# On feature branch, ensure everything is committed
git status

# Switch to main
git checkout main

# Merge feature branch
git merge feature/new-feature

# Check that feature.txt is now in main
ls -la

# View merged commits
git log --oneline

# Delete feature branch
git branch -d feature/new-feature
```

---

## Exercise 5: Resolving Merge Conflicts

```bash
# Create a branch
git checkout -b feature/conflict-test

# Modify README.md
echo "# My Project - Feature Version" > README.md
git add README.md
git commit -m "Update README on feature branch"

# Switch to main
git checkout main

# Modify README.md differently
echo "# My Project - Main Version" > README.md
git add README.md
git commit -m "Update README on main"

# Try to merge (will conflict)
git merge feature/conflict-test

# Git will show conflict in README.md
cat README.md

# Resolve by editing README.md
nano README.md
# or use your editor

# After resolving:
git add README.md
git commit -m "Resolve merge conflict"

# Delete branch
git branch -d feature/conflict-test
```

---

## Exercise 6: Undoing Changes

```bash
# Create a test file
echo "test" > test.txt
git add test.txt
git commit -m "Add test file"

# Make changes (don't stage)
echo "modified" > test.txt

# Undo changes (revert to last commit)
git restore test.txt
cat test.txt  # Should show "test" again

# Stage file
echo "modified again" > test.txt
git add test.txt

# Unstage (keep changes in working directory)
git restore --staged test.txt

# Changes still exist
cat test.txt

# Discard changes
git restore test.txt
```

---

## Exercise 7: Viewing History

```bash
# View full history
git log

# View one line per commit
git log --oneline

# View last 3 commits
git log -3

# View commits with file changes
git log -p

# View commits with statistics
git log --stat

# View graphical history
git log --graph --oneline --all

# View commits for specific file
git log README.md

# View commits by specific author
git log --author="Your Name"
```

---

## Exercise 8: Stashing

```bash
# Make changes but don't commit
echo "in progress" > work-in-progress.txt
git add work-in-progress.txt
echo "more work" >> hello.txt

# Check status
git status

# Save work temporarily
git stash

# Status should be clean
git status

# List stashed items
git stash list

# Get work back
git stash pop

# Check status (work restored)
git status
```

---

## Exercise 9: Working with Remote (GitHub)

```bash
# 1. Create repository on GitHub

# 2. Add remote
git remote add origin https://github.com/YOUR-USERNAME/git-practice.git

# 3. Verify remote
git remote -v

# 4. Push to remote
git branch -M main
git push -u origin main

# 5. Check remote
git remote show origin

# 6. On another machine, clone it
git clone https://github.com/YOUR-USERNAME/git-practice.git

# 7. Make changes and push
git checkout -b feature/update
echo "new content" > new-file.txt
git add new-file.txt
git commit -m "Add new file"
git push origin feature/update

# 8. Pull changes from remote
git pull origin main
```

---

## Exercise 10: Git Workflow Simulation

Simulate a complete development workflow:

```bash
# 1. Start with clean main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/user-profile

# 3. Make changes (simulate development)
mkdir -p src/components
echo "export const UserProfile = () => {...}" > src/components/UserProfile.js
git add src/
git commit -m "Create UserProfile component"

# 4. Make more changes
echo "import UserProfile from './UserProfile'" > src/App.js
git add src/App.js
git commit -m "Import UserProfile in App"

# 5. View your work
git log feature/user-profile --oneline

# 6. Switch to main and ensure up to date
git checkout main
git pull origin main

# 7. Merge feature into main
git merge feature/user-profile

# 8. Push to remote
git push origin main

# 9. Delete feature branch locally and remotely
git branch -d feature/user-profile
git push origin --delete feature/user-profile

# 10. View final history
git log --oneline
```

---

## Challenge Exercises

### Challenge 1: Cherry-pick
```bash
# Create two branches with different commits
git checkout -b branch1
echo "commit 1" > file1.txt
git add file1.txt
git commit -m "Commit 1"

git checkout -b branch2
echo "commit 2" > file2.txt
git add file2.txt
git commit -m "Commit 2"

git checkout main
# Use cherry-pick to apply one of the commits
git cherry-pick <commit-hash>
```

### Challenge 2: Rebase
```bash
# Create feature branch
git checkout -b feature/rebase-test

# Make commits
echo "change 1" > file.txt
git add file.txt
git commit -m "Feature commit 1"

echo "change 2" > file.txt
git add file.txt
git commit -m "Feature commit 2"

# Rebase onto main (cleaner history than merge)
git rebase main

# Or merge for comparison
git checkout main
git merge feature/rebase-test
```

### Challenge 3: Interactive Rebase
```bash
# View last 3 commits
git log --oneline -3

# Interactive rebase
git rebase -i HEAD~3

# Commands:
# pick - use commit
# reword - change message
# squash - combine with previous
# fixup - combine without keeping message
# drop - delete commit
```

---

## Common Issues & Solutions

### Issue: Accidentally committed to main
```bash
git reset --soft HEAD~1
git stash
git checkout -b feature/correct-branch
git stash pop
git commit -m "Correct commit"
```

### Issue: Need to change last commit message
```bash
git commit --amend -m "New message"
```

### Issue: Accidentally deleted branch
```bash
git reflog
# Find commit hash
git checkout -b recovered-branch <commit-hash>
```

### Issue: Pushed wrong commit to remote
```bash
git push origin --force-with-lease <branch>
```

---

## Summary of Key Concepts

✓ **Repository** = folder with .git
✓ **Commit** = snapshot of code
✓ **Branch** = independent line of work
✓ **Staging** = preparing changes to commit
✓ **Merge** = combining branches
✓ **Push/Pull** = sending/receiving from remote
✓ **History** = all commits over time

Practice these exercises to become comfortable with Git!
