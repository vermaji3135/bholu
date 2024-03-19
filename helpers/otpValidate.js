const otpVerification = async (otpTime) => {
  try {
    console.log('Milliseconds is:' + otpTime)
    const cDate = new Date()
    const differenceValue = (otpTime - cDateTime.getTime()) / 1000;
    differenceValue= differenceValue/60;
    const minutes = Math.abs(differenceValue);
 console.log("expired minutes:-"+differenceValue);
 if(minutes>2){
  return true;
 }
 return false;



  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  otpVerification,
}
