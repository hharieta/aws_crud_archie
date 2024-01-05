// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../config/dbconfig";
import { useRouter } from "next/router";

const styles = {
    inputField:
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
};

const CreateTableDimanic = () => {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const params = {
            AttributeDefinitions: [
                {
                  AttributeName: "id", //Primary Key name
                  AttributeType: "N", //type of the primary key
                },
                {
                  AttributeName: "dateAdded", //Sort key name
                  AttributeType: "S", //Type of the sort key
                },
                // {
                //     AttributeName: "category",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "cloud",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "title",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "actionName",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "environment",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "env-short",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "description1",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "description2",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "description3",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "cost",
                //     AttributeType: "N"
                // },
                // {
                //     AttributeName: "imageUrl",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "type",
                //     AttributeType: "S"
                // },
                // {
                //     AttributeName: "upcoming",
                //     AttributeType: "B"
                // }
              ],
              KeySchema: [
                {
                  AttributeName: "id", //Primary key name
                  KeyType: "HASH",
                },
                {
                  AttributeName: "dateAdded", //Sort key name
                  KeyType: "RANGE",
                },
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
              },
              TableName: event.target.tableName.value, //TABLE_NAME
              StreamSpecification: {
                StreamEnabled: true,
                StreamViewType: "KEYS_ONLY",
              },
        };

        try {
            const data = await ddbClient.send(new CreateTableCommand(params));
            console.log("Table Created", data);
            alert("Table Created!")
            document.getElementById("createTable-form").reset();
            return data;
          } catch (err) {
            console.log(err);
          }
    };

    return (
        <>
          <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-3xl mb-20">Create Table</p>
            <div className="block p-6 rounded-lg shadow-lg bg-white w-1/3 justify-self-center">
              <form onSubmit={handleSubmit} id="createTable-form">
                <div className="form-group mb-6">
                  <label
                    htmlFor="tableName"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Table Name
                  </label>
                  <input type="text" className={styles.inputField} id="tableName" />
                </div>
                <button
                  type="submit"
                  className="
        px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      );


};
export default CreateTableDimanic;
