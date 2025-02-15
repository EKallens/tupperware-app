import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom'
import { AuthLayout } from '@/layouts/auth/AuthLayout'
import { DashboardLayout } from '@/layouts/dashboard/DashboardLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { HomePage } from '@/pages/dashboard/HomePage'
import { RecipeDetailsPage } from '@/pages/dashboard/RecipeDetailsPage'
import { RecipesPage } from '@/pages/dashboard/RecipesPage'
import { FavoritesRecipesPage } from '@/pages/dashboard/FavoritesRecipesPage'
import { SettingsPage } from '@/pages/dashboard/SettingsPage'
import { TagsPage } from '@/pages/dashboard/TagsPage'
import { Root } from '@/Root'
import { EmailVerificationPage } from '@/pages/auth/EmailVerificationPage'
import { useAuthStore } from '@/store/useAuthStore'
import { PropsWithChildren, useEffect } from 'react'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { NewRecipePage } from '@/pages/dashboard/NewRecipePage'
import { EditRecipePage } from '@/pages/dashboard/EditRecipePage'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { isAuthenticated, isCheckingAuth, checkAuth, user } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isCheckingAuth) {
        return <LoadingSpinner />
    }
    if (!isAuthenticated || !user?.isVerified) {
        return <Navigate to="/auth/login" replace />
    }
    return children
}

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    { path: '', element: <HomePage /> },
                    { path: 'recipes', element: <RecipesPage /> },
                    { path: 'recipes/:id', element: <RecipeDetailsPage /> },
                    { path: 'tags', element: <TagsPage /> },
                    { path: 'settings', element: <SettingsPage /> },
                    { path: 'favorites-recipes', element: <FavoritesRecipesPage /> },
                    { path: 'recipes/new', element: <NewRecipePage /> },
                    { path: 'recipes/edit/:id', element: <EditRecipePage /> }
                ]
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'verify', element: <EmailVerificationPage /> },
            { path: 'forgot', element: <ForgotPasswordPage /> },
            { path: 'reset-password/:token', element: <ResetPasswordPage /> }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />
    }
]

const router = createBrowserRouter(routes)

export const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}
