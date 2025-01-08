import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

export const RecipeSkeleton = (): JSX.Element => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index: number) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-sm w-full overflow-hidden"
                    key={index}
                >
                    <Card className="bg-white shadow-sm max-w-[290px] max-h-[450px] dark:bg-primaryDark dark:border-none">
                        <CardHeader>
                            <div className="flex flex-row justify-between mb-4">
                                <CardTitle>
                                    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                </CardTitle>
                                <div>
                                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <CardDescription>
                                <div className="flex items-center">
                                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded ml-2 animate-pulse"></div>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-32 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex flex-wrap items-center">
                                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded ml-1 animate-pulse"></div>
                                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded ml-1 animate-pulse"></div>
                                </div>
                                <div className="flex flex-wrap items-center">
                                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded ml-1 animate-pulse"></div>
                                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded ml-1 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        </CardContent>
                        <CardFooter className="break-all">
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                                    ></div>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </>
    )
}
