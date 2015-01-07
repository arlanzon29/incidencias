Polymer("olba-auth", {

  connect:function(){
    this.username=this.$.txtUsername.value;
    this.password=this.$.txtPassword.value;

    this.fire("connect");
  }
});