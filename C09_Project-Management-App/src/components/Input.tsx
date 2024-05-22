import React, {forwardRef} from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({label, ...props}, ref) => {
    const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
        <div className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            <input {...props} className={classes} ref={ref}/>
        </div>
    );
});

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({label, ...props}, ref) => {
    const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
        <div className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            <textarea {...props} className={classes} ref={ref}/>
        </div>
    );
});

export {Input, Textarea};
// export default Input;