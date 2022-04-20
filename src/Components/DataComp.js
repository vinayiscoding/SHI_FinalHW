
function Datatable({data}) {
    const columns = data[0] && Object.keys(data[0]);
    //create datatable for the texas breweries
    return(
        <table cellPadding = {10} cellSpacing = {10}>
            <thead>
                <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
            </thead>
            <tbody>
                {data.map(row => <tr>
                    {
                        columns.map(column => 
                        <td>{row[column]} </td>)  
                        }      
                </tr>)}
            </tbody>
        </table>
    );
}

export default Datatable;