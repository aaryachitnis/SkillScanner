import React  from 'react';
import styles from './mystyle.module.css'; 
import {useNavigate} from "react-router-dom";

export default function ProfileSetup() {
  let navigate = useNavigate();

  function handleSubmit(event) {  
    event.preventDefault(); // stops data being sent to the server immediately
    // storing the data entered by users in variables:
    let formData = new FormData(event.currentTarget);
    let fullName = formData.get("name");
    let profession = formData.get("profession");
    let location = formData.get("location");
    let expYear = formData.get("expYear");
    let email = formData.get("email");
    let phoneNum = formData.get("phoneNum");
    let headlines = formData.get("headline");
    let services_products = formData.get("services/products");
    let experience = formData.get("experience");

    console.log (fullName,profession,location,expYear,email,phoneNum,headlines,services_products,experience); // for testing purposes
    
    try{
      const response =  fetch ('http://localhost:3001/profilesetup', {
        method: "POST",
        crossDomain: true,
        headers: { 
          "Content-Type": "application/json",
          Accept:"application/json",
          "Accept-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"), // sends the token to the server 
          // sends profile setup information to server
          fullName, profession, location, expYear, email, phoneNum, headlines, services_products, experience, 
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data === "valid"){
          alert ("Profile has been set up!")
          setTimeout(() => {  navigate("/homepage"); }, 1000); // waits one second before redirecting to homepage
        } else {
          alert (data)
        }
      })
    } 
    catch (err){
      console.log(err);
    }
  }
      
    // displaying the form for profile setup
    return (
        <>
            <h3>Set up your profile so you can start attracting clients! </h3>
            <div className={styles.box}>
            <form onSubmit={handleSubmit}>
                <label>Full name</label>
                <br/>
                <input size="50" name="name" placeholder='Enter your forename and surname' required/> 
                <br/>

                <br/>
                <label htmlFor="profession">Choose you profession: </label>
                <select defaultValue = "-- select your profession --" name="profession" id="profession" required>
                    <option disabled> -- select your profession -- </option>
                    <option value="Accountant"> Accountant </option>
                    <option value="Actor"> Actor </option>
                    <option value="Architect"> Architect </option>
                    <option value="Artist"> Artist </option>
                    <option value="Builder"> Builder </option>
                    <option value="Carpenter"> Carpenter </option>
                    <option value="Chef"> Chef </option>
                    <option value="Dentist"> Dentist </option>
                    <option value="Dietician"> Dietician </option>
                    <option value="Doctor"> Doctor </option>
                    <option value="Eyelash technician"> Eyelash technician </option>
                    <option value="Electrician"> Electrician </option>
                    <option value="Filmmaker"> Filmmaker </option>
                    <option value="Gardener"> Gardener </option>
                    <option value="Hair stylist"> Hair stylist </option>
                    <option value="Housekeeper"> Housekeeper </option>
                    <option value="Interior designer"> Interior designer </option>
                    <option value="Jeweller"> Jeweller </option>
                    <option value="Lawyer"> Lawyer </option>   
                    <option value="Makeup artist"> Makeup artist </option> 
                    <option value="Mechanic"> Mechanic </option>
                    <option value="Nail technician"> Nail technician </option>
                    <option value="Nutritionist"> Nutritionist </option>
                    <option value="Nurse"> Nurse </option>
                    <option value="Painter"> Painter </option>
                    <option value="Photographer"> Photographer </option>
                    <option value="Physician"> Physician </option>
                    <option value="Plumber"> Plumber </option>
                    <option value="Secretary"> Secretary </option>
                    <option value="Software developer"> Software developer </option>
                    <option value="Solicitor"> Solicitor </option>
                    <option value="Sports coach"> Sports coach </option>
                    <option value="Tutor"> Tutor </option>
                    <option value="Therapist"> Therapist </option>
                    <option value="Translator"> Translator </option>
                    <option value="Videographer"> Videographer </option>
                </select>
                <br/>

                <br/>
                <label htmlFor="location">Choose you location: </label>
                <select defaultValue = "-- select your location --" name="location" id="location" required>
                    <option disabled> -- select your location -- </option>
                    <option value="Bath"> Bath </option>
                    <option value="Birmingham"> Birmingham  </option>
                    <option value="Bradford"> Bradford </option>
                    <option value="Brighton and Hove"> Brighton and Hove </option>
                    <option value="Bristol"> Bristol </option>
                    <option value="Cambridge"> Cambridge </option>
                    <option value="Canterbury"> Canterbury </option>
                    <option value="Carlisle"> Carlisle </option>
                    <option value="Chelmsford"> Chelmsford </option>
                    <option value="Chester"> Chester </option>
                    <option value="Chichester"> Chichester </option>
                    <option value="Colchester"> Colchester </option>
                    <option value="Coventry"> Coventry </option>
                    <option value="Derby"> Derby </option>
                    <option value="Doncaster"> Doncaster </option>
                    <option value="Durham"> Durham </option>
                    <option value="Ely"> Ely </option>
                    <option value="Exeter"> Exeter </option>
                    <option value="Gloucester"> Gloucester </option>
                    <option value="Hereford"> Hereford </option>
                    <option value="Kingston-upon-Hull"> Kingston-upon-Hull </option>
                    <option value="Lancaster"> Lancaster </option>
                    <option value="Leeds"> Leeds </option>
                    <option value="Leicester"> Leicester </option>
                    <option value="Lichfield"> Lichfield </option>
                    <option value="Lincoln"> Lincoln </option>
                    <option value="Liverpool"> Liverpool </option>
                    <option value="London"> London </option>
                    <option value="Manchester"> Manchester </option>
                    <option value="Milton Keynes"> Milton Keynes </option>
                    <option value="Newcastle-upon-Tyne"> Newcastle-upon-Tyne </option>
                    <option value="Norwich"> Norwich </option>
                    <option value="Nottingham"> Nottingham </option>
                    <option value="Oxford"> Oxford </option>
                    <option value="Peterborough"> Peterborough </option>
                    <option value="Plymouth"> Plymouth </option>
                    <option value="Portsmouth"> Portsmouth </option>
                    <option value="Preston"> Preston </option>
                    <option value="Ripon"> Ripon </option>
                    <option value="Salford"> Salford </option>
                    <option value="Salisbury"> Salisbury </option>
                    <option value="Sheffield"> Sheffield </option>
                    <option value="Southampton"> Southampton </option>
                    <option value="Southend-on-Sea"> Southend-on-Sea </option>
                    <option value="St Albans"> St Albans </option>
                    <option value="Stoke on Trent"> Stoke on Trent </option>
                    <option value="Sunderland"> Sunderland </option>
                    <option value="Truro"> Truro </option>
                    <option value="Wakefield"> Wakefield </option>
                    <option value="Wells"> Wells </option>
                    <option value="Westminster"> Westminster </option>
                    <option value="Winchester"> Winchester </option>
                    <option value="Wolverhampton"> Wolverhampton </option>
                    <option value="Worcester"> Worcester </option>
                    <option value="York"> York </option>
                    <option value="Armagh"> Armagh </option>
                    <option value="Bangor"> Bangor </option>
                    <option value="Belfast"> Belfast </option>
                    <option value="Lisburn"> Lisburn </option>
                    <option value="Londonderry"> Londonderry </option>
                    <option value="Newry"> Newry </option>
                    <option value="Aberdeen"> Aberdeen </option>
                    <option value="Dundee"> Dundee </option>
                    <option value="Dunfermline"> Dunfermline </option>
                    <option value="Edinburgh"> Edinburgh </option>
                    <option value="Glasgow"> Glasgow </option>
                    <option value="Inverness"> Inverness </option>
                    <option value="Perth"> Perth </option>
                    <option value="Stirling"> Stirling </option>
                    <option value="Bangor"> Bangor </option>
                    <option value="Cardiff"> Cardiff </option>
                    <option value="Newport"> Newport </option>
                    <option value="St Asaph"> St Asaph </option>
                    <option value="St Davids"> St Davids </option>
                    <option value="Swansea"> Swansea </option>
                    <option value="Wrexham"> Wrexham </option>
                </select>
                <br/>
                
                <br/>
                <label htmlFor="expYear">Select how many years of expereince you have </label>
                <select defaultValue = "-- select years of expereince --" name="expYear" id="expYear" required>
                    <option disabled> -- select years of experience -- </option>
                    <option value="<1"> Less than a year </option>
                    <option value="3-5"> 1-5 years</option>
                    <option value="5-10"> 5-10 years </option>
                    <option value="10-15"> 10-15 years</option>
                    <option value="15-20"> 15-20 years</option>
                    <option value="20+"> 20+ years</option>
                </select>
                <br/>

                <br/>
                <label>Email </label>
                <br/>
                <input name = "email" size="50" placeholder='Enter the email address clients can use to contact you' required/> 
                <br/>

                <br/>
                <label>Phone number </label>
                <br/>
                <input name="phoneNum" size="50" placeholder='Enter the phone number clients can use to contact you'/> 
                <br/>

                <br/>
                <label>Headline </label>
                <br/>
                <input name = "headline" size="205" placeholder='A sentence that will help you attract clients' required/>
                <br/>

                <br/>
                <label>My services/product </label>
                <br/>
                <input name="services/products" size="205" placeholder='Tell us more about your services and/or products' required/>
                <br/>

                <br/>
                <label>My experience </label>
                <br/>
                <input name="experience" size="205" placeholder='Tell us more about your expereince in your field' required/>
                <br/>

                <br/>
                <button> Submit </button>
                <br/>
            </form>
            
            <br/>
            <button onClick={()=>navigate("/homepage")}> Skip</button> 
            </div>
        </>
    )
}
