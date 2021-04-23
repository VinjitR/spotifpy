import React,{useEffect,useState} from 'react';
import 'chartjs-plugin-streaming';
import { HeaderC } from './HeaderC';
import {FooterC} from './FooterC';
import './css/styles.css';



export default function HorchartA () {
    const trendartistsurl="api/trending_artists";
    const [artists,setartists]=useState([]);



    const getArtists = async () => {
        const response = await fetch(trendartistsurl);
        const jsonData = await response.json();
        const usedData=jsonData;
        console.log(usedData);
        setartists(usedData);      
    };
    useEffect(() => {
        getArtists();
        const interval=setInterval(()=>{
            getArtists();
        },3000);
        return () => {
            clearInterval(interval);
        }
    }, [])


    const maxExpense = 200;
    const chartHeight = maxExpense + 100;
    const barWidth = 60;
    const barMargin = 90;
    const numberofBars = 30;
    let width = numberofBars * (barWidth + barMargin);
    
    // Calculate highest expense for the month
    const calculateHighestTrend = (data) => data.reduce((acc, cur) => {
        const { artist_trend } = cur;
        return artist_trend > acc ? artist_trend : acc;    
    }, 0);
    
    const [highestTrend, setHighestTrend] = useState(
        calculateHighestTrend(artists));
    
    useEffect(() => {
        console.log(highestTrend);
    });
    

    let refreshChart = ()=> {
        setInterval(()=>{const newHighestexpense = calculateHighestTrend(artists);
            setHighestTrend(newHighestexpense);}, 3000);
            
    }
    
    return (
        <>
        <div >
            <HeaderC message="Trending Artitst Chart"/>
        <div className="container-fluid chart">
            <h3>Trending Artists</h3>
    
        <Chart height={chartHeight} width={width}>
        {artists.map((data, index) => {
            const barHeight = data.artist_trend;
            return (
            <Bar
            key={data.artist_name}
            x={index * (barWidth + barMargin)}
            y={chartHeight - barHeight}
            width={barWidth}
            height={barHeight}
            expenseName={data.artist_name}
            highestExpense={highestTrend}
            />
            );
        })}
        </Chart> 
        <div className="row">
        <div className="col colb">
        <button type="button" class="btn btn-outline-primary" onClick={refreshChart}>Refresh Chart</button>
        </div>
        </div>
        </div>
        <FooterC/>
        </div>
        </>
    );
    }
    
    const Chart = ({ children, width, height }) => (
    <svg
        viewBox={`0 0 ${width} ${height}`}   
        width={(width*.05).toString()+"%"}
        height="100%"
        preserveAspectRatio="xMidYMax meet"
    >
        {children}
    </svg>
    );
    
    const Bar = ({ x, y, width, height, expenseName,highestExpense }) => (
        <>
        <rect x={x} y={y} width={width} height={height} fill={ highestExpense===height ?`purple`:`black`} /> 
        <text x={x } y={y - 5}>
            {highestExpense===height ? `${expenseName}: ${height}` : `${expenseName}`}
        </text>
        </>
    );
   
// const data = [
//     { name: "Phone", expense: 151 },
//     { name: "Electricity", expense: 100 },
//     { name: "Car", expense: 5 },
//     { name: "House", expense: 43 },
//     { name: "Food", expense: 56 },
//     { name: "Leisure", expense: 182 }
//   ];
  
//   function App() {
  
//     const [expensesData, setExpensesData] = useState(data);
//     const maxExpense = 200;
//     const chartHeight = maxExpense + 20;
//     const barWidth = 50;
//     const barMargin = 30;
//     const numberofBars = expensesData.length;
//     let width = numberofBars * (barWidth + barMargin);
    
//     // Calculate highest expense for the month
//     const calculateHighestExpense = (data) => data.reduce((acc, cur) => {
//       const { expense } = cur;
//       return expense > acc ? expense : acc;    
//     }, 0);
  
//     const [highestExpense, setHighestExpense] = useState(
//       calculateHighestExpense(data));
  
//     useEffect(() => {
//       console.log(JSON.stringify(expensesData));
//       console.log(highestExpense);
//     });
  
//     const createRandomData = (data) => data.map((exp) => ({
//       name: exp.name,
//       expense: Math.floor(Math.random() * maxExpense)
//     }))
//     let refreshChart = ()=> {
//       const newData = createRandomData(expensesData);
//       const newHighestexpense = calculateHighestExpense(newData);
//       setExpensesData(newData);
//       setHighestExpense(newHighestexpense);    
//     }
  
//     return (
//       <>
//         <p className="legend">
//           <span className="expense">Expense</span>
//           <span className="highest-expense">Highest expense</span>
//         </p>
  
//         <Chart height={chartHeight} width={width}>
//         {expensesData.map((data, index) => {
//           const barHeight = data.expense;
//           return (
//             <Bar
//             key={data.name}
//             x={index * (barWidth + barMargin)}
//             y={chartHeight - barHeight}
//             width={barWidth}
//             height={barHeight}
//             expenseName={data.name}
//             highestExpense={highestExpense}
//             />
//           );
//         })}
//         </Chart> 
  
//         <button onClick={refreshChart}>Refresh Chart</button>
//       </>
//     );
//   }
  
//   const Chart = ({ children, width, height }) => (
//     <svg
//       viewBox={`0 0 ${width} ${height}`}   
//       width="100%"
//       height="70%"
//       preserveAspectRatio="xMidYMax meet"
//     >
//       {children}
//     </svg>
//   );
  
//   const Bar = ({ x, y, width, height, expenseName,highestExpense }) => (
//       <>
//         <rect x={x} y={y} width={width} height={height} fill={ highestExpense===height ?`purple`:`black`} /> 
//         <text x={x + width / 3} y={y - 5}>
//            {highestExpense===height ? `${expenseName}: ${height}` : `${height}`}
//         </text>
//       </>
//     );