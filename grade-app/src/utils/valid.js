const valid = ({email, password,fullname,username, confirmPassword,gender})=>{
    const err ={}
    if(!fullname){
        err.fullname = 'Please add your full name'
    }else if(fullname.length > 25 ){
        err.fullname = 'length should be lesss than 25 characters'
    }
    if(!username){
        err.username = 'Please add your username'
    }else if(username.length > 25 ){
        err.username = 'length should be lesss than 25 characters'
    }
    if(!email){
        err.username = 'Please add your email'
    }
    else if(!validateEmail(email) ){
        err.email = 'Invalid email format'
    }

     if(!password){
        err.password= 'Please add your password'
    }else if(username.length < 6 ){
        err.password= 'length should be greater than 6 characters'
    }
    if(password !== confirmPassword){
        err.confirmPassword ='Password should match'
    }
    return{
        errMsg: err,
        errLength:Object.keys(err).length
    }
}
function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
}
export default  valid