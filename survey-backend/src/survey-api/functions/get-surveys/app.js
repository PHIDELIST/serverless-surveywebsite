const tableName ='surveys-table';
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
const docClient = DynamoDBDocument.from(new DynamoDB());

const fetchAllSurveys = async (allData =[],exclusiveStartKey =null) => {
    let params = {
        TableName: tableName,
        Limit: 10,
        ExclusiveStartKey: exclusiveStartKey
    };
    // We use Scan operator to fetch whole items from table
    let data = await docClient.scan(params);
    
    //put all paginated items into array
    if(data['Items'].length > 0){
        allData = [...allData, ...data['Items']]
    }
        //we are paginating the items by checking LastyEvaluatedkey
    if(data['LastEvaluatedKey']){
        return await fetchAllSurveys(allData, data.LastEvaluatedKey);
    }else{
        return data ['Items'];
    }
}
exports.getSurveys = async (event) => {
    if(event.httpMethod !== 'GET'){
        throw new Error(`getSurveys only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);
    let items={}

    //it calls the fetchAllSurveys function to fetch all the items from table
    try{
        items = await fetchAllSurveys();

    }catch(err){
        console.log("Failure",err.message);
    }
//It returns the items in json format with status code 200
const response ={
    statusCode: 200,
    body:JSON.stringify(items)
};

return response;

}

