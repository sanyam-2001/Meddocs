interface Disease{
    name: string;
    diagnosedAt: string;
    prescribedMedication?: Array<String>;
    curedAt: string;
}

interface Consulations{
    timestamp: string;
    prescriptionURL: string;
    symptoms: Array<string>;
    descriptions: string;
    reports: Array<string>;
    active: Boolean;
}

interface medicalData{
    bloodType?: 'O+' | 'O-'| 'A+'| 'A-'| 'B+'| 'B-'| 'AB+'| 'AB-';
    allergies?: Array<string>;
    eyeSight?: {
        left: string;
        right: string;
    }
    diseases?: {
        chronic: Array<Disease>
        medicalHistory:Array<Consulations>
    }
    currentmedication?: Array<string>;
    weight?: string;
    height?: string;
    BMI?: string;

    covidDetails: {
        vaccinationStatus: 'U' | 'P' | 'C';
        vaccinationDetail: {
            name: 'COVI' | "COWA" | "SPUT";
            certificateURLS: String; 
        }
    }
}