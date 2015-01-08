
  Polymer("olba-postcardcliente",{

    ready: function() {

    },
    click:function(){

      this.fire('next',this.templateInstance.model.cliente);
    }
    ,
    clickImage:function(){
      this.fire('image',this.templateInstance.model.cliente);
    }
  });
