import { useEffect, useState } from "react";
import Pagination from "./pagination";
import { coinList } from "./data";
import { Table } from "react-bootstrap";

function App() {
  const [list, setList] = useState(coinList);
  const [currentList, setCurrentList] = useState(coinList);

  const [state, setState] = useState({
    Skip: 0,
    Take: 2,
    CurrentPage: 1,
  });

  useEffect(() => {
    currentData();
  }, [state.CurrentPage]);

  function currentData() {
    const start = (state.CurrentPage - 1) * state.Take;
    const end = start + state.Take;
    setCurrentList(coinList.slice(start, end));
  }

  const onMove = (e, pageNum, skip) => {
    setState({ ...state, CurrentPage: pageNum, Skip: skip });
  };

  // const onSearch = e => {
  //   if (state.CurrentPage != 1)
  //       setState({
  //           ...state,
  //           Skip: 0,
  //           CurrentPage: 1
  //       });
  //   else
  //       props.getAll(getReqParams());
  // }
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        onClick={onMove}
        count={coinList.length}
        take={state.Take}
        currentPage={state.CurrentPage}
      />
    </>
  );
}

export default App;
