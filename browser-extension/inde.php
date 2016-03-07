
<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//$txt = print_r($_GET, true);
//echo $txt;
//mysql_connect("sql304.byethost14.com", "b14_17578805", "kapere80") or die(mysql_error()); //line 14
//mysql_select_db("b14_17578805_ship") or die(mysql_error());
//
//$result = mysql_query("Select * from cart");  
//echo "<h2>Here is a list of the topics:</h2>";  
//while ($row = mysql_fetch_array($result)) {  
//    echo $row['ext_data']."<br />";  
//}  
//mysql_close($con);
//exit();
echo "here";
$conn = new mysqli("sql304.byethost14.com", "b14_17578805", "kapere80", "b14_17578805_ship") or die('Could not connect: ' . mysqli_connect_error()); 
$sql = "SELECT ext_data, country FROM cart where id='".$_GET["cart_id"]."' limit 1";
$sql = "Select * from cart";
$result = $conn->query($sql);
echo "there";
if ($result->num_rows > 0) {
    // output data of each row
  $row = $result->fetch_assoc();
  print_r($row);

}
