// Import required AWS SDK clients and commands for Node.js.
import { useEffect, useState } from "react";
import { ddbDocClient } from "../config/ddbDocClient.js";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import Link from "next/link.js";
import { useRouter } from "next/router";

const Styles = {
  tableHeadings:
    "text-sm font-medium text-gray-900 h-0.5 px-6 py-4 text-left border-2",
  tableData: "text-sm text-gray-900 h-0.5 font-light px-6 py-4 whitespace-nowrap overflow-hidden text-center",
  inputField:
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
};

const ViewData = () => {
  let data = [];
  const [tableData, setTableData] = useState([]);
  const route = useRouter();
  let tableName = route.query.tableName ? route.query.tableName : "archie-new-templates-sandbox"
;

  //   scanning the dynamodb table
  const scanTable = async () => {
    try {
      data = await ddbDocClient.send(new ScanCommand({ TableName: tableName }));
      setTableData(data.Items);
      console.log("success", data.Items);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    tableName = event.target.tableName.value;
    try {
      data = await ddbDocClient.send(new ScanCommand({ TableName: tableName}));
      setTableData(data.Items);
      console.log("success", data.Items);
    } catch (err) {
      console.log("Error", err);
    }
  };

  //   deleting an item from the table
  const deleteItem = async (primaryKeyValue, sortKeyValue) => {
    try {
      await ddbDocClient.send(
        new DeleteCommand({
          TableName: tableName,
          Key: {
            id: primaryKeyValue,
            dateAdded: sortKeyValue,
          },
        })
      );
      console.log("Success - item deleted");
      scanTable();
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    scanTable();
  }, []);

  return (
    <div className="container mx-auto py-10 px-0 flex flex-col w-screen h-screen items-center">
      <div className="flex w-2/3 justify-between py-4">
      <Link
          href={{
            pathname: "/",
          }}
        >
          <button
            type="button"
            className="inline-block px-6 py-2.5 mr-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Go Home
          </button>
        </Link>
        <Link
          href={{
            pathname: "/adddata",
          }}
        >
          <button
            type="button"
            className="inline-block px-6 py-2.5 mr-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Add Data
          </button>
        </Link>
      </div>
      <p className="text-3xl">View Data</p>
      <form onSubmit={handleSubmit} id="view-data" className="container flex align-items justify-center pt-5">
        <div className="flex flex-initial w-64 pr-4">
          <label
              htmlFor="tableName"
              className="form-label inline-block mb-2 text-gray-700 flex-1"
            >
            </label>
            <input type="text" className={Styles.inputField} id="tableName" placeholder="Table Name..."/>
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
            Select
          </button>
      </form>
      <div className="flex flex-col w-screen py-10">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                  <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center border-2"
                    >
                      Action
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      id
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Category
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Solution
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Cloud
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Title
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Action Name
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Environment
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      envShort
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Description 1
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Description 2
                    </th>
                    {/* <th scope="col" className={Styles.tableHeadings}>
                      Description 3
                    </th> */}
                    <th scope="col" className={Styles.tableHeadings}>
                      Cost
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Diagram
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Type
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Upcoming
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Template Resources
                    </th>
                    {/* <th scope="col" className={Styles.tableHeadings}>
                      Optional Values
                    </th> */}
                    <th scope="col" className={Styles.tableHeadings}>
                      Main Values
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Dataconfig
                    </th>
                    <th scope="col" className={Styles.tableHeadings}>
                      Config Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr className="border-b" key={item.id}>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                        <Link
                          href={{
                            pathname: "/updatedata",
                            query: {
                              tableName: tableName,
                              id: item.id,
                              dateAdded: item.dateAdded,
                              category: item.category,
                              solution: item.solution,
                              cloud: item.cloud,
                              tittle: item.tittle,
                              actionName: item.actionName,
                              env: item.env,
                              envShort: item.envShort,
                              description: item.description,
                              description2: item.description2,
                              cost: item.cost, 
                              diagram: item.diagram,
                              type: item.type,
                              upcoming: item.upcoming,
                              templateResources: item.templateResources,
                              mainResources: item.mainResources,
                              dataconf: item.dataconf,
                              configdata: item.configdata
                            },
                          }}
                        >
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 mr-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => deleteItem(item.id, item.dateAdded)}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className={Styles.tableData}>{item && item.category ? item.category.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.solution ? item.solution.slice(0,100): ''}</td>
                      <td className={Styles.tableData}>{item && item.cloud ? item.cloud.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.tittle ? item.tittle.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.actionName ? item.actionName.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.env ? item.env.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.envShort ? item.envShort.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.description ? item.description.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.description2 ? item.description2.slice(0,100) : ''}</td>
                      {/* <td className={Styles.tableData}>{item && item.description3 ? item.description3.slice(0,100) : ''}</td> */}
                      <td className={Styles.tableData}>{item && item.cost ? item.cost.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.diagram ? item.diagram.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.type ? item.type.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.upcoming ? item.upcoming.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.templateResources ? item.templateResources.slice(0,100) : ''}</td>
                      {/* <td className={Styles.tableData}>{item && item.optionalValues ? item.optionalValues.slice(0,100) : ''}</td> */}
                      <td className={Styles.tableData}>{item && item.mainResources ? item.mainResources.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.dataconf ? item.dataconf.slice(0,100) : ''}</td>
                      <td className={Styles.tableData}>{item && item.configdata ? item.configdata.slice(0,100) : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
