# 🚀 Git Workflow for KTProd Platform

## 📋 Branch Strategy

### 🏗️ Branch Structure
- **`main`** → Production branch (Vercel deployment)
- **`dev`** → Development branch (requires review)
- **feature/*` → Feature branches (for development)

### 🔄 Workflow Process

#### 1. **Development Workflow**
```bash
# Create a new feature branch
git checkout -b feature/new-feature

# Make your changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request to dev branch
# Wait for your review and approval
```

#### 2. **Review Process**
- All changes must go through **pull request to `dev`**
- **You must review and approve** before merging to `dev`
- Automated checks run on every PR
- PR template must be filled out

#### 3. **Deployment Process**
```bash
# After approval, merge to dev
git checkout dev
git merge feature/new-feature
git push origin dev

# When ready for production
git checkout main
git merge dev
git push origin main  # Triggers Vercel deployment
```

## 🛡️ Branch Protection Rules

### **Dev Branch Protection**
- ✅ **Requires pull request** for all changes
- ✅ **Requires your approval** before merging
- ✅ **Automated checks** must pass
- ✅ **PR template** must be completed

### **Main Branch Protection**
- ✅ **Protected branch** - direct pushes disabled
- ✅ **Only from dev** - can only merge from dev branch
- ✅ **Vercel deployment** - auto-deploys on push

## 📝 Pull Request Template

When creating a PR to `dev`, use the template:
- 📋 **Changes Overview** - Brief description
- ✅ **Changes Made** - Specific changes list
- 🧪 **Testing** - How you tested
- 📸 **Screenshots** - For UI changes
- 🔗 **Related Issues** - Link to tickets
- ✅ **Checklist** - Review requirements
- 📝 **Review Notes** - Focus areas

## 🚀 Deployment

### **Development (Dev Branch)**
- Changes merged to `dev`
- No automatic deployment
- Testing environment

### **Production (Main Branch)**
- Changes merged from `dev` to `main`
- **Automatic Vercel deployment**
- Live production site

## 🎯 Best Practices

### **Commit Messages**
```bash
feat: add new feature
fix: resolve bug in editor
docs: update README
refactor: improve code structure
test: add unit tests
```

### **Branch Naming**
```bash
feature/user-authentication
bugfix/image-upload-issue
hotfix/critical-security-patch
```

### **Pull Request Guidelines**
1. **Keep PRs focused** - One feature per PR
2. **Write clear descriptions** - What and why
3. **Include tests** - When applicable
4. **Update documentation** - When needed
5. **Request review** - Wait for approval

## 🔧 GitHub Setup

### **Branch Protection Settings**
1. Go to GitHub repository
2. Settings → Branches
3. Add branch protection rules:
   - **Dev branch**: Require PR, require approval, require checks
   - **Main branch**: Require PR from dev, restrict pushes

### **Required Checks**
- ✅ **Build passes** - Project builds successfully
- ✅ **TypeScript check** - No TS errors
- ✅ **Tests pass** - All tests succeed

## 📱 Quick Commands

```bash
# Start new work
git checkout -b feature/your-feature-name

# Save work
git add .
git commit -m "feat: your change description"
git push origin feature/your-feature-name

# Create PR to dev (on GitHub)
# Wait for your review and approval

# Merge to dev (after approval)
git checkout dev
git pull origin dev
git merge feature/your-feature-name
git push origin dev

# Deploy to production (when ready)
git checkout main
git pull origin main
git merge dev
git push origin main
```

---

**⚠️ Important**: 
- **Never push directly to main**
- **Always create PR to dev first**
- **Wait for your review and approval**
- **Merge dev to main only when ready for production**
