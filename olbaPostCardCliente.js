
  Polymer("olba-postcardcliente",{

    ready: function() {

    },
    click:function(){

      this.fire('next',this.templateInstance.model.cliente);
    }
  });
