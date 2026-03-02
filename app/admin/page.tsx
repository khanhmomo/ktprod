import { getAllBlogPosts } from "@/lib/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Edit, Plus, Settings, Home, FileImage, Users, Mail } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const posts = await getAllBlogPosts();
  const publishedPosts = posts.filter(post => post.published).length;
  const draftPosts = posts.filter(post => !post.published).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-poppins">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your website content and blog posts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">
              All blog posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts}</div>
            <p className="text-xs text-muted-foreground">
              Live on website
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPosts}</div>
            <p className="text-xs text-muted-foreground">
              Unpublished posts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>
            Update content on different pages of your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/admin/content/home">
            <div className="flex items-center space-x-3 p-3 rounded-2xl border hover:bg-muted/50 transition-colors cursor-pointer">
              <Home className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Homepage Content</div>
                <div className="text-sm text-muted-foreground">Update hero section, features, and CTAs</div>
              </div>
            </div>
          </Link>
          
          <Link href="/admin/content/about">
            <div className="flex items-center space-x-3 p-3 rounded-2xl border hover:bg-muted/50 transition-colors cursor-pointer">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">About Page</div>
                <div className="text-sm text-muted-foreground">Edit company story and team information</div>
              </div>
            </div>
          </Link>

          <Link href="/admin/content/tech">
            <div className="flex items-center space-x-3 p-3 rounded-2xl border hover:bg-muted/50 transition-colors cursor-pointer">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Technology Page</div>
                <div className="text-sm text-muted-foreground">Update tech solutions and features</div>
              </div>
            </div>
          </Link>

          <Link href="/admin/content/contact">
            <div className="flex items-center space-x-3 p-3 rounded-2xl border hover:bg-muted/50 transition-colors cursor-pointer">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Contact Page</div>
                <div className="text-sm text-muted-foreground">Update contact information and form</div>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Blog Management */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
          <CardDescription>
            Create, edit, and manage your blog posts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/admin/blog/new">
            <div className="flex items-center space-x-3 p-3 rounded-2xl border hover:bg-muted/50 transition-colors cursor-pointer">
              <Plus className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Create New Post</div>
                <div className="text-sm text-muted-foreground">Start writing a new blog post</div>
              </div>
            </div>
          </Link>
          
          <Link href="/admin/blog">
            <div className="flex items-center space-x-3 p-3 rounded-2xl border hover:bg-muted/50 transition-colors cursor-pointer">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Manage All Posts</div>
                <div className="text-sm text-muted-foreground">Edit, publish, or delete posts</div>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>
            Latest blog posts and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first blog post to get started.
              </p>
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 border rounded-2xl">
                  <div className="flex-1">
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {post.published ? "Published" : "Draft"} • {post.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              {posts.length > 5 && (
                <div className="text-center pt-4">
                  <Link href="/admin/blog">
                    <Button variant="outline">View All Posts</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
