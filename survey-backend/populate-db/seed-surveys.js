'use strict'
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
const region = 'us-east-1';
AWS.config.update({region: region});

const surveysTable = 'surveys-table';

const getCurrentDate = () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

async function seedSurveys() {
    let formttedDateNow = getCurrentDate();

    let survey1 = {};
    survey1.admin_id = "1";
    survey1.id = uuid();
    survey1.survey_title = "Test Survey";
    survey1.survey_description = "This is a test survey";
    survey1.survey_created_date = formttedDateNow;
    survey1.survey_updated_date = formttedDateNow;
    survey1.survey_end_date = "2023-07-15";
    survey1.survey_adminName = "phidelist";
    survey1.survey_adminEmail = "phidel@gmail.com";
    survey1.survey_adminPassword = "######";
    survey1.survey_adminPhone = "+2549090909";
    survey1.survey_adminCountry= "kenya";
    survey1.survey_adminCity= "Nyeri";
    survey1.survey_adminOrganizationType= "IT";
    survey1.survey_adminOrganizationName= "JITU";
    survey1.survey_adminAvatarName= "1.png";

    try{
        await DynamoDB.put({Item :survey1, TableName : surveysTable}).promise();
    }catch(err){
        console.log(err);
    }

    let survey2 = {};
    survey1.admin_id = "2";
    survey1.id = uuid();
    survey1.survey_title = "Second Test Survey";
    survey1.survey_description = "This is a second test survey";
    survey1.survey_created_date = formttedDateNow;
    survey1.survey_updated_date = formttedDateNow;
    survey1.survey_end_date = "2023-07-15";
    survey1.survey_adminName = "phidelist";
    survey1.survey_adminEmail = "phidel@gmail.com";
    survey1.survey_adminPassword = "#########";
    survey1.survey_adminPhone = "+25409090909";
    survey1.survey_adminCountry= "kenya";
    survey1.survey_adminCity= "Nyeri";
    survey1.survey_adminOrganizationType= "IT";
    survey1.survey_adminOrganizationName= "JITU";
    survey1.survey_adminAvatarName= "2.png";

    try{
        await DynamoDB.put({Item :survey2, TableName : surveysTable}).promise();
    }catch(err){
        console.log(err);
    }
    let survey3 = {};
    survey1.admin_id = "3";
    survey1.id = uuid();
    survey1.survey_title = "Test Survey Three";
    survey1.survey_description = "This is third test survey";
    survey1.survey_created_date = formttedDateNow;
    survey1.survey_updated_date = formttedDateNow;
    survey1.survey_end_date = "2023-07-15";
    survey1.survey_adminName = "phidelist";
    survey1.survey_adminEmail = "phidel@gmail.com";
    survey1.survey_adminPassword = "2846614";
    survey1.survey_adminPhone = "+25409090909";
    survey1.survey_adminCountry= "kenya";
    survey1.survey_adminCity= "Nyeri";
    survey1.survey_adminOrganizationType= "IT";
    survey1.survey_adminOrganizationName= "JITU";
    survey1.survey_adminAvatarName= "3.png";

    try{
        await DynamoDB.put({Item :survey3, TableName : surveysTable}).promise();
    }catch(err){
        console.log(err);
    }

}
 
const DynamoDB = new AWS.DynamoDB.DocumentClient();

seedSurveys(DynamoDB);
console.log('done seeding surveys');