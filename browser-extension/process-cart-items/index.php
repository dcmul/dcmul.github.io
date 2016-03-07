<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if($_POST) {
  
//  echo "here";
//  $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
//  $txt = print_r($_POST, true);
//  fwrite($myfile, $txt);
//  fclose($myfile);
  
  $error = '';
  $insert_id = 0;
  //$conn = new mysqli("localhost", "shipfromusa", "shipfromusa", "shipfromusa");
  $conn = new mysqli("sql304.byethost14.com", "b14_17578805", "kapere80", "b14_17578805_ship"); 
  // Check connection
  $ext_data = $conn->real_escape_string($_POST["ext_data"]);

  $sql = "INSERT INTO cart (ext_data, country, shop_or_ship)
  VALUES ('".$ext_data."', '".$_POST["country"]."', '".$_POST["shop_or_ship"]."')";

  if ($conn->query($sql) === TRUE) {
      $insert_id = $conn->insert_id;
      
  } else {
      $error = "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();  
  
  $final = array (
    "cart_id" => $insert_id,
    "country" => $_POST["country"],
    "error" => $error,
  );
  print json_encode($final);
  
}