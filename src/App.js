import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.div`
  text-align: center;
  button {
    margin: 10px;
    width: 200px;
    height: 40px;
    border-radius: 10px;
    background-color: pink;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Flex = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  margin: auto;
  /* border: 1px solid black; */
`;

const Grid = styled.div`
  width: 1200px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border: 5px solid pink;
  border-radius: 10px;
`;

function App() {
  const [data, setData] = useState();
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  useEffect(() => {
    axios.get(url).then((res) => {
      const nextUrl = res.data.next;
      const prevUrl = res.data.previous;
      const result = res.data.results;
      setNextUrl(nextUrl);
      setPrevUrl(prevUrl);
      setData(result);
    });
  }, [url]);
  function next() {
    setUrl(nextUrl);
  }
  function prev() {
    setUrl(prevUrl);
  }

  return (
    <>
      {/* {data !== null ? (
        data.map((item, index) => <div key={index}>{item}</div>)
      ) : (
        <></>
      )} */}
      <Button>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </Button>
      <Grid>
        {data && (
          <>
            {data.map((e, i) => (
              <Render key={i} name={e.name} url={e.url} />
            ))}
          </>
        )}
      </Grid>
    </>
  );
}

function Render({ name, url }) {
  const [poke, setPoke] = useState();

  useEffect(() => {
    axios.get(url).then((res) => {
      setPoke({
        front_img: res.data.sprites.front_default,
        back_img: res.data.sprites.back_default,
      });
    });
  }, [name]);
  // console.log(poke);
  return (
    <>
      {poke && (
        <Flex>
          <img src={poke.front_img} alt="" />
          <h3>{name}</h3>
          {/* <img src={poke.back_img} alt="" /> */}
        </Flex>
      )}
    </>
  );
}
export default App;
