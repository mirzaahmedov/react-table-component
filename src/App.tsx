import Table from "./components/Table";

const sampleData = [
  {
    firstName: "hello",
    age: 20,
    isMarried: true,
    some: {
      value: "hello",
    },
  },
  {
    firstName: "world",
    age: 33,
    isMarried: false,
    some: {
      value: "hello",
    },
  },
  {
    firstName: "print",
    age: 11,
    isMarried: false,
    some: {
      value: "hello",
    },
  },
  {
    firstName: "console",
    age: 40,
    isMarried: true,
    some: {
      value: "hello",
    },
  },
];

function App() {
  return (
    <div>
      <Table
        cols={[
          { field: "firstName", label: "First name" },
          { field: "age", label: "Age" },
          { field: "some", label: "Some" },
        ]}
        rows={sampleData}
        renderRow={(r, c) => {
          return r[c.field];
        }}
      />
    </div>
  );
}

export default App;
