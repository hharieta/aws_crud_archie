import { ddbDocClient } from "../config/ddbDocClient";
import { useRouter } from "next/router";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const styles = {
    inputField: "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
}


const UpdateData = () => {
  const router = useRouter();
  const data = router.query;
  
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    console.log(data.tableName);
    // setting up the parameters for UpdateCommand
    const params = {
      TableName: data.tableName,
      Key: {
        id: Number(data.id), //primaryKey
        dateAdded: data.dateAdded, //sortKey (if any)
      },
      UpdateExpression:
        "SET #category = :val1, #cloud = :val2, #solution = :val3, #tittle = :val4, #actionName = :val5, #env = :val6, #envShort = :val7, #description = :val8, #description2 = :val9, #cost = :val10, #diagram = :val11, #type = :val12, #upcoming = :val13, #templateResources = :val14, #mainResources = :val15, #dataconf = :val16, #dateModified = :val17, #configdata = :val18",
      ExpressionAttributeValues: {
        ":val1": event.target.category.value,
        ":val2": event.target.cloud.value,
        ":val3": event.target.solution.value,
        ":val4": event.target.tittle.value,
        ":val5": event.target.actionName.value,
        ":val6": event.target.env.value,
        ":val7": event.target.envShort.value,
        ":val8": event.target.description.value,
        ":val9": event.target.description2.value,
        ":val10": event.target.cost.value,
        ":val11": event.target.diagram.value,
        ":val12": event.target.type.value,
        ":val13": event.target.upcoming.value,
        ":val14": event.target.templateResources.value,
        ":val15": event.target.mainResources.value,
        ":val16": event.target.dataconf.value,
        ":val17": new Date().toLocaleString(),
        ":val18": event.target.configdata.value
      },
      ExpressionAttributeNames: {
        "#category": "category",
        "#cloud": "cloud",
        "#solution": "solution",
        "#tittle": "tittle",
        "#actionName": "actionName",
        "#env": "env",
        "#envShort": "envShort",
        "#description": "description",
        "#description2": "description2",
        "#cost": "cost",
        "#diagram": "diagram",
        "#type": "type",
        "#upcoming": "upcoming",
        "#templateResources": "templateResources",
        "#mainResources": "mainResources",
        "#dataconf": "dataconf",
        "#dateModified": "dateModified",
        "#configdata": "configdata"
      }
    };

    // updating the db
    try {
      const data = await ddbDocClient.send(new UpdateCommand(params));
      console.log("Success - updated", data);
      alert('Data Updated Successfully')
      router.push('/viewdata')
    } catch (err) {
      console.log("Error", err);
    }
  };
  
  return (
    <>
      <div className="flex flex-col justify-center items-center adddata">
        <p className="text-3xl mb-20">Update Data</p>
        <div className="block p-6 rounded-lg shadow-lg bg-white justify-self-center form-container">
          <form onSubmit={handleSubmit} id="addData-form" className="w-full">
            <div>
              <section className="flex gap-4">
                <div className="form-group mb-6 flex-initial w-32">
                  <label
                    htmlFor="category"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="category"
                    defaultValue={data.category}
                  />
                </div>
                <div className="form-group mb-6 flex-initial w-32">
                  <label
                    htmlFor="solution"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Solution
                  </label>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    id="solution" 
                    defaultValue={data.solution} 
                  />
                </div>
                <div className="form-group mb-6 flex-initial w-32">
                  <label
                    htmlFor="cloud"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Cloud
                  </label>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    id="cloud"
                    defaultValue={data.cloud}
                  />
                </div>
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="tittle"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Title
                  </label>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    id="tittle" 
                    defaultValue={data.tittle}
                    />
                </div>
              </section>
              <section className="flex gap-4">
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="actionName"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Action Name
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="actionName"
                    defaultValue={data.actionName}
                  />
                </div>
                <div className="form-group mb-6 flex-initial w-32">
                  <label
                    htmlFor="env"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Environment
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="env"
                    defaultValue={data.env}
                  />
                </div>
                <div className="form-group mb-6 flex-initial w-32">
                  <label
                    htmlFor="envShort"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Env Short
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="envShort"
                    defaultValue={data.envShort}
                  />
                </div>
                <div className="form-group mb-6 flex-initial w-14">
                  <label
                    htmlFor="cost"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Cost
                  </label>
                  <input 
                    type="text" 
                    className={styles.inputField} 
                    id="cost"
                    defaultValue={data.cost}
                    />
                </div>
              </section>
              <section className="flex gap-4">
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="description"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Description 1
                  </label>
                  <textarea
                    rows={4}
                    className={styles.inputField}
                    id="description"
                    defaultValue={data.description}
                  ></textarea>
                </div>
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="description2"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Description 2
                  </label>
                  <textarea
                    rows={4}
                    className={styles.inputField}
                    id="description2"
                    defaultValue={data.description2}
                  />
                </div>
              </section>
              <section className="flex gap-4">
                {/* <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="description3"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Description 3
                  </label>
                  <textarea
                    rows={4}
                    className={styles.inputField}
                    id="description3"
                    defaultValue={data.description3}
                  />
                </div> */}
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="diagram"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                   Diagram
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="diagram"
                    defaultValue={data.diagram}
                  />
                  <section className="flex gap-4">
                  <div className="form-group mb-6">
                  <label
                    htmlFor="type"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="type"
                    defaultValue={data.type}
                  />
                </div>
                <div className="form-group mb-6">
                  <label
                    htmlFor="upcoming"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Upcoming
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="upcoming"
                    defaultValue={data.upcoming}
                  />
                </div>
                </section>
              </div>
              </section>
              <section className="flex gap-4">
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="templateResources"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Template Resources
                  </label>
                  <textarea 
                    type="text" 
                    rows={4} 
                    className={styles.inputField} 
                    id="templateResources" 
                    defaultValue={data.templateResources}
                    />
                </div>
                {/* <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="optionalValues"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Optional Values
                  </label>
                  <textarea
                    rows={4}
                    type="text"
                    className={styles.inputField}
                    id="optionalValues"
                    defaultValue={data.optionalValues}
                  />
                </div> */}
              </section>
              <section className="flex gap-4">
              <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="mainResources"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Main Resources
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="mainResources"
                    defaultValue={data.mainResources}
                  />
                  <section className="flex gap-4">
                </section>
                </div>
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="dataconf"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Dataconf
                  </label>
                  <textarea
                    rows={12}
                    className={styles.inputField}
                    id="dataconf"
                    defaultValue={data.dataconf}
                  />
                </div>
              </section>
              <section className="flex gap-4">
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="jsondata"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Config Data
                  </label>
                  <textarea
                    rows={12}
                    className={styles.inputField}
                    id="configdata"
                    defaultValue={data.configdata}
                  />
                </div>
              </section>
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
                ease-in-out
              "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateData;
