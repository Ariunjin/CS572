/*
Books Collection

{
    _id:<ObjectId>, 
    isbn:'3221-213-231'
    title:'Algo',
    authors:[ {first:'Alaa',last:'Hass'},
               {first:'Ari',last:'Dav'}],
      tags:['NN','BinarySearch','tree'] ,
      copies:7,
      borrowInfo:[ 
                  {name:'s1',phone:'9768656',returnDate:'',isReturned:0}      ]   

}
Student Collection
{
    _id:<ObjectId>, 
    name:'s1',
    email:'s1@mum.edu',
    phone:'9768656'    
}

INDEX FOR searching borrowed book
createIndex('authors.first':1);
createIndex('borrowInfo.name':1);
createIndex('borrowInfo.returnDate':-1,name:1);

*/

