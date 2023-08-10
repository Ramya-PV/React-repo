import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import './Api.css';
import Card from "@mui/material/Card";
import { CardContent, Typography, hslToRgb } from "@mui/material";
import write from '../src/images/writing-svgrepo-com.svg'
import { Link, Router } from "react-router-dom";

function Api() {

    // const [data, setData] = useState([])

    // const apiloading = () => {
    //     const apiload = axios.get("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8");
    //     apiload.then((e) => setData(e.data));
    //     console.log('data', apiload);
    // }

    // useEffect(() => {
    //     apiloading();
    // }, [])

    //  let result=[]
    //  const fore={
    //     data.forEach((e) =>{
    //         result.push(
    //     <tr>
    //     <td>{e.name}</td>
    //     <td>{e.city}</td>
    //     </tr>

    //         )
    //     })

    const [postData, setPostData] = useState([])//global
    const [searchData, setsearchData] = useState();//local


    const loadPosts = () => {
        let response = axios.get('https://jsonplaceholder.typicode.com/posts/')
        response.then((res) => {
            if (res.data) {
                setPostData(res.data);
                setsearchData(res.data);
            }
        });
    }

    useEffect(() => {
        loadPosts();
    }, [])

    const searchById = (e) => {
        if (e.target.value !== '') {
            let resultData = searchData.filter((re) => re['id'] === Number(e.target.value));
            setPostData(resultData);
        }
        else {
            setPostData(searchData);
        }
    }

    const generateRandomColor = () => {
        const randomColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
        return randomColor;
    }

    const setFocus = () => {
        document.getElementsByName('searchValue')[0].focus();
    }

    return (
        <>
        {/* <Router> */}
            <div style={{ padding: 10, display: 'flex', justifyContent: "space-between" }} id='backdrop'>

                <input type='text' placeholder="search" name='searchValue' onChange={searchById}
                    style={{ marginLeft: 10, width: 220, height: 30, borderRadius: 3, marginTop: '15px', }} />

                <img src={write} height={'40px'} width={'40px'} onClick={setFocus} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'left' }} />
                
                {/* <ul>
                    <li><a class="active" href="home">Home</a></li>
                    <li><a href="news">News</a></li>
                    <li><a href="contact">Contact</a></li>
                    <li><a href="about">About</a></li>
                    {/* <li><Link to="home">Home</Link></li>
                    <li><Link to="news">News</Link></li>
                    <li><Link to="contact">Contact</Link></li>
                    <li><Link to="about">About</Link></li> */}
                {/* </ul> */}
            </div>
            {/* </Router> */}
            <div id="cardss" >
                {/* <table>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                </tr>
                {data.map((n) =>
                    <tr>
                        <td>{n.name}</td>

                        <td style={{ color: n.city === "Madrid" ? "red" :n.city === "Paris" ? "Brown":"green" }}>{n.city==="Alabama"? n.city.toUpperCase():n.city}</td>
                    </tr>
                )}

            </table> */}

                {
                    postData.map((n) =>
                        <Card variant="outlined" style={{ display: 'inline-flex', flexDirection: 'row', width: '250px', height: '150px', overflow: "auto", backgroundColor: generateRandomColor() }}>
                            <CardContent >
                                <Typography style={{ textAlign: 'left' }}><h5>ID:{n.id}</h5></Typography>
                                <Typography style={{ alignContent: "initial" }}>Title:{n.title}</Typography>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </>
    );
}


export default Api;
