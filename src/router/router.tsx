import { RecipeDetails } from '@/components/recipe-details/RecipeDetails'
import { AuthLayout } from '@/layouts/auth/AuthLayout'
import { DashboardLayout } from '@/layouts/dashboard/DashboardLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { HomePage } from '@/pages/dashboard/HomePage'
import { ProfilePage } from '@/pages/dashboard/ProfilePage'
import { RecipesPage } from '@/pages/dashboard/RecipesPage'
import { SaveRecipesPage } from '@/pages/dashboard/SaveRecipesPage'
import { SettingsPage } from '@/pages/dashboard/SettingsPage'
import { TagsPage } from '@/pages/dashboard/TagsPage'
import { Root } from '@/Root'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        path: '',
                        element: <HomePage />
                    },
                    {
                        path: 'recipes',
                        element: <RecipesPage />,
                        children: [
                            {
                                path: ':id',
                                element: <RecipeDetails />
                            }
                        ]
                    },
                    {
                        path: 'tags',
                        element: <TagsPage />
                    },
                    {
                        path: 'settings',
                        element: <SettingsPage />
                    },
                    {
                        path: 'save-recipes',
                        element: <SaveRecipesPage />
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />
                    }
                ]
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    }
])
