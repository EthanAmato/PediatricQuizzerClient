import React, { useEffect, useState } from 'react'
import { getServerData } from '../../helper/helper'

export default function ResultTable() {
    const [data, setData] = useState([]);
    useEffect(() => {
      getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/results`, (res) => {
        console.log(res)
        setData(res)
      })
    }, [])

    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attempt</td>
                        <td>Total Points</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    { !data ?? <div>Data not found...</div>}
                    {
                        data.map((val, index) => {
                            return(
                            <tr className='table-body'>
                                <td>{val?.username || ''}</td>
                                <td>{val?.attempts || 0}</td>
                                <td>{val?.points || 0}</td>
                                <td>{val?.achieved || ""}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
