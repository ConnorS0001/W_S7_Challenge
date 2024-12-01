import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
  /* MY CODE */

    const initialErors = { fullName: '', size: ''}

    const formSchema = yup.object().shape({
      fullName: yup 
        .string().trim()
        .min(3, validationErrors.fullNameTooShort).max(20, validationErrors.fullNameTooLong)
        .required(),
      size: yup
        .string()
        .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
        .required()
    })

  /* MY CODE */

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

export default function Form() {
  /*MY CODE*/ 
    const getInitialValues = () =>({ 
      fullName: '', 
      size: '', 
      toppings: [] 
    }) 
    const [values, setValues] = useState(getInitialValues())  
    const [errors, setErrors] = useState(initialErors)
    const [enabled, setEnabled] = useState(false)     
    const [success, setSuccess] = useState('')
    const [failure, setFailure] = useState('')
    
    useEffect(() => {
      formSchema.isValid(values).then(isValid => {
        setEnabled(isValid)
      })
    }, [values])

    
    const changeHandler = evt => {      
      let {id, value} = evt.target
      setValues({...values, [id]: value})
      yup
        .reach(formSchema, id)
        .validate(value)
        .then(() => { setErrors({...errors, [id]: ''}) })
        .catch((error) => { setErrors({...errors, [id]: error.errors[0] });
      });
    }

    const toppingHandler = evt => { 
      const {id, name} = evt.target
      const newTopping = values.toppings.concat(name)
      setValues({
        ...values,
        [id]: newTopping
      })
    }

    const handleSubmit = evt => {
      evt.preventDefault() 
      axios.post(`http://localhost:9009/api/order`, values)
        .then (res =>  {
          setValues(getInitialValues())
          setSuccess(res.data.message) 
          setFailure('')         
        })
        .catch (res =>  {          
          setFailure(res.response.data.message)
          setSuccess('')
        })        
    }  

  /*MY CODE*/

  return (
    <form /*MY CODE*/ id= 'myForm' onSubmit={handleSubmit} /*MY CODE*/>
      <h2>Order Your Pizza</h2>
      {success && <div className='success' >{success}</div>}
      {failure && <div className='failure'>{failure}</div>}

      <div className="input-group">
                  
          <label htmlFor="fullName">Full Name</label><br />          
          <input 
            value={values.fullName}
            placeholder="Type full name" 
            id="fullName" 
            name='fullname'
            type="text" 
            onChange={changeHandler}
          />
        
        {true && <div className='error'>
          {/*MY CODE*/errors.fullName && <span>{errors.fullName}</span>/*MY CODE*/}
        </div>}
      </div>

      <div className="input-group">
        <div>          
          <label htmlFor="size">Size</label><br />
          <select id="size" value={values.size} onChange={changeHandler}>
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {true && <div className='error'>
          {/*MY CODE*/errors.size && <span>{errors.size}</span>/*MY CODE*/}
        </div>}
      </div>

      <div className="input-group">        
        {/*MY CODE*/ 
        ///TOPPINGS ///
          toppings.map((idx) => 
            <label key={idx.topping_id}>
              <input
                value={values.toppings}
                name={idx.topping_id}
                type="checkbox"
                id="toppings"
                /*MY CODE*/ 
                onChange={toppingHandler} 
                /*MY CODE*/
              />
              {idx.text}<br />
            </label>
          )          
        /*MY CODE*/}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled={!enabled} type="submit"/>
    </form>
  )
}

/* TESTS

    × [8] A successful order clears the form (777 ms)
    × [10] Validation of `fullName` renders correct error message (768 ms)
    
*/