// import * as React from 'react'

// import { cn } from '@/utils/utils'

// const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
//     ({ className, type, ...props }, ref) => {
//         return (
//             <input
//                 type={type}
//                 className={cn(
//                     'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
//                     className
//                 )}
//                 ref={ref}
//                 {...props}
//             />
//         )
//     }
// )
// Input.displayName = 'Input'

// export { Input }

import * as React from 'react'

import { cn } from '@/utils/utils'
import { LucideIcon } from 'lucide-react'
import { IconBaseProps, IconType } from 'react-icons/lib'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: IconType | React.ForwardRefExoticComponent<IconBaseProps & React.RefAttributes<SVGSVGElement>>
    endIcon?: IconType | React.ForwardRefExoticComponent<IconBaseProps & React.RefAttributes<SVGSVGElement>>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, startIcon, endIcon, ...props }, ref) => {
        const StartIcon = startIcon
        const EndIcon = endIcon

        return (
            <div className="w-full relative">
                {StartIcon && (
                    <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
                        <StartIcon size={18} className="text-muted-foreground" />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
                        startIcon ? 'pl-8' : '',
                        endIcon ? 'pr-8' : '',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {EndIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <EndIcon className="text-muted-foreground" size={18} />
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
