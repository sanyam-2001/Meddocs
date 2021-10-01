const { db, bucket } = require("../Config/firebase.config");
const updateUser = async (data, UID = "eOJrEip94eAJneGTkOAL") => {
  if (data.type == "D") {
    db.collection("users").add({
      SRID: data.SRID,
      age: data.age,
      email: data.email,
      experience: data.experience,
      gender: gender.experience,
      mobile: data.mobile,
      name: data.name,
      qualifications: data.qualifications,
      speciality: data.speciality,
      type: data.type,
    });
  } else if (data.type == "P") {
    db.collection("users").add({
      aadhar: db.aadhar,
      age: db.age,
      bloodType: db.bloodType,
      email: db.email,
      gender: db.gender,
      medicalData: db.medicalData,
      mobile: db.mobile,
      name: db.name,
      signedIn: db.signedIn,
      type: db.type,
    });
  } else {
    db.collection("users").add({
      email: db.email,
      password: db.password,
      signedIn: db.signedIn,
      verified: db.verified,
    });
  }
};

module.exports = updateUser;
