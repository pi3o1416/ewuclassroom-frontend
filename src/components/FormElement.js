
import React from 'react'


export function FormElement(props) {

    return (
        <div className="field">
            <label className="label" htmlFor={props.htmlFor}>{props.label}</label>
            <div >
                {props.type === 'radio' ?
                    props.value.map((value, index) => (
                        <div key={index}>
                            <input
                                className={props.className}
                                id={props.id[index]}
                                value={value}
                                name={props.name}
                                type={props.type}
                                onChange={props.onChange}
                            />
                            <label htmlFor="{props.id[index]}">{props.id[index]}</label>
                        </div>
                    ))
                    :
                    <input
                        className={props.className}
                        type={props.type}
                        name={props.name}
                        id={props.id}
                        autoComplete={props.autoComplete}
                        value={props.username}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                    />
                }

            </div>
        </div>
    )
}
