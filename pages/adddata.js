import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../config/ddbDocClient";
import { useRouter } from "next/router";

const styles = {
  inputField:
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
};

const AddData = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const params = {
      TableName: event.target.tableName.value,
      Item: {
        id: Math.floor(Math.random() * 10000),
        dateAdded: new Date().toLocaleString(),
        dateModified: "",
        category: event.target.category.value,
        cloud: event.target.cloud.value,
        solution: event.target.solution.value,
        tittle: event.target.tittle.value,
        actionName: event.target.actionName.value,
        env: event.target.env.value,
        envShort: event.target.envShort.value,
        description: event.target.description.value,
        description2: event.target.description2.value,
        // description3: event.target.description3.value,
        cost: event.target.cost.value,
        diagram: event.target.diagram.value,
        type: event.target.type.value,
        upcoming: event.target.upcoming.value,
        templateResources: event.target.templateResources.value,
        // optionalValues: event.target.optionalValues.value,
        // defaultValues: event.target.defaultValues.value,
        mainResources: event.target.mainResources.value,
        // allResources: event.target.allResources.value,
        dataconf: event.target.dataconf.value
      },
    };

    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      console.log("Success - item added", data);
      alert("Data Added Successfully");
      router.push(`/viewdata?tableName=${event.target.tableName.value}`);
      document.getElementById("addData-form").reset();
    } catch (err) {
      console.log("Error", err.stack);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center adddata">
        <p className="text-3xl mb-20">Add Data</p>
        <div className="block p-6 rounded-lg shadow-lg bg-white justify-self-center form-container">
          <form onSubmit={handleSubmit} id="addData-form" className="w-full">
            <div>
              <section className="flex">
                <div className="form-group mb-6 flex-1" tabIndex={-1}>
                  <label
                    htmlFor="tableName"
                    className="inline-block mb-2 text-gray-700"
                  >
                    Table Name
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="tableName"
                  />
                </div>
              </section>
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
                  />
                </div>
                <div className="form-group mb-6 flex-initial w-32">
                  <label
                    htmlFor="solution"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Solution
                  </label>
                  <input type="text" className={styles.inputField} id="solution" />
                </div>
                <div className="form-group mb-6 flex-initial w-32">
                  <label
                    htmlFor="cloud"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Cloud
                  </label>
                  <input type="text" className={styles.inputField} id="cloud" />
                </div>
                <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="tittle"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Title
                  </label>
                  <input type="text" className={styles.inputField} id="tittle" />
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
                  />
                </div>
                <div className="form-group mb-6 flex-initial w-14">
                  <label
                    htmlFor="cost"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Cost
                  </label>
                  <input type="text" className={styles.inputField} id="cost" />
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
                    placeholder="Write a short description..."
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
                    placeholder="Write a short description..."
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
                    placeholder="Write a short description..."
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
                  <textarea type="text" rows={4} className={styles.inputField} id="templateResources" />
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
                  />
                </div> */}
                {/* <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="defaultValues"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Default Values
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="defaultValues"
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
                  />
                  <section className="flex gap-4">
                  {/* <div className="form-group mb-6 flex-1">
                  <label
                    htmlFor="allResources"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    All Resources
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    id="allResources"
                  />
                </div> */}
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
                    placeholder="Dataconf JSON style..."
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

export default AddData;
