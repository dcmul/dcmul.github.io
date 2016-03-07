
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
  <head>
    <title>TODO supply a title</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body style="zoom: 1;">
<table id="cart" width="80%">
  <tr class="headerRow">
          <td width="15%" style="font-weight: bold; text-align: left;"><h1>Cart</h1></td>
          <td width="55%">&nbsp;</td>
          <td width="10%" class="price" style="font-weight: bold;">USD</td>
          <td width="10%" class="price" style="font-weight: bold;">KSh</td>
          <td width="10%" class="price" style="font-weight: bold;">Quantity</td>
        </tr>
<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//$txt = print_r($_GET, true);
//echo $txt;

//$conn = new mysqli("localhost", "shipfromusa", "shipfromusa", "shipfromusa");
$conn = new mysqli("sql304.byethost14.com", "b14_17578805", "kapere80", "b14_17578805_ship"); 
$sql = "SELECT ext_data, country FROM cart where id='".$_GET["cart_id"]."' limit 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
  $row = $result->fetch_assoc();
  
  $ext_data = json_decode($row['ext_data']) ;
  foreach($ext_data as $k => $v) {
    echo "<tr><td colspan='5'>".$k."</td></tr>";
    echo "<tr><td>";
    foreach($v as $v1) {
      //echo $v1->currency;
      //echo print_r($v1, true);
?>
<tr class="item" data-index="0" data-item-id="C2SHR6KDQM1W" data-merchant-id="1" data-merchant-url="http://www.amazon.com/" data-quantity="1" data-price_usd="122005" data-total_usd="122005" data-customs="14640.6" data-vat="19520.8">

  <td class="image"><img src="<?php print $v1->img_src; ?>"></td>
              <td class="name">
                <span>
                  <a href="<?php print $v1->link; ?>"><?php print $v1->desc ?><br><span class="itemspecs"></span>
                  </a>
                </span>
              </td>
		<td class="price price_usd prime">$<?php print $v1->price ?></td>
	              <td class="price price_ksh">N<?php print $v1->price_N ?></td>
              <td class="quantity">
              <?php print $v1->qty ?>
                
              </td>
            </tr>        
<?php        
    }
    echo "</td></tr>";
  }
  
} else {
    echo "0 results";
}
$conn->close();

?>
    </table>

  </body>
</html>
