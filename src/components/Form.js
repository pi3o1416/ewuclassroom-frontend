
import React from 'react'
import {FormElement} from './FormElement'
import '../css/main.css'



export function Form(props) {
    const FORM_FIELDS = props.formFields
    const formFields = FORM_FIELDS.map((field) => (

        <FormElement
            key={field.label}
            label={field.label}
            htmlFor={field.id}
            className={field.className}
            type={field.type}
            name={field.name}
            id={field.id}
            autoComplete={field.autoComplete}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            checked={field.checked}
        />
    ));



    return (
        <form className="box p-6 " method="post" onSubmit={props.onSubmit}>
            {typeof [] === typeof props.error ?
                props.error.map((err) => (
                    <p className="help has-text-danger" key={err}><strong>{err}</strong></p>
                ))
                :
                <p className="help has-text-danger"><strong>{props.error}</strong></p>
            }
            <br />
            {formFields}
            <div className="field is-grouped is-justify-content-center">
                <div className="control">
                    <button className="button is-link">Submit</button>
                </div>
            </div>
        </form>
    )

}
