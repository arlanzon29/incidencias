
    Polymer("olba-sheet", {
      nombre:"Josu",
      ready: function() {
        this.allrows=[];
      },
      getAll:function(arr){
         this.$.allData.go();
      },
      handleResponse:function(obj,response){
        var resp=JSON.parse(response.response.substring(13,response.response.length-1));

        var arr=[];
        for (var i=1;i<resp.length;i++){
          var obj={};

          for (var j=0;j<resp[0].length;j++){
            obj[resp[0][j]]=resp[i][j];
          }
          arr.push(obj);
        }

        this.allrows=arr;
        this.fire("alldata");
      },
      mergeAll:function(arr){
        var body=JSON.stringify(arr);
        this.$.mergeAll.body=body;
        this.$.mergeAll.go();
      },
      handleResponseMergeAll:function(obj,response){
         this.fire("mergeall");
      }
    });
