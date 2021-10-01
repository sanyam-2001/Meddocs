const { db } = require("../Config/firebase.config");
const updateUser = async (data, UID) => {
  if (data.type === "D") {
    await db.collection("users").doc(UID).update({
      SRID: data.SRID,
      age: data.age,
      experience: data.experience || null,
      gender: data.gender,
      mobile: data.mobile,
      name: data.name,
      qualifications: data.qualifications,
      speciality: data.speciality || [],
      type: "D"
    });
  } else if (data.type === "P") {
    await db.collection("users").doc(UID).update({
      aadhar: data.aadhar,
      age: data.age,
      bloodType: data.bloodType || null,
      gender: data.gender,
      mobile: data.mobile,
      name: data.name,
      type: "P"
    });
  }
  const response = await db.collection('users').doc(UID).get();
  
  return{
    statusCode: 200,
    error: null,
    data: response.data()
  }
};

module.exports = updateUser;
