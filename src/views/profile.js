import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { getConfig } from '../components/config';
import "./profile.css";
class Profile extends React.Component {
  userData;
    constructor(props) {
        super(props);
        this.onChangeTutor = this.onChangeTutor.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeMajor = this.onChangeMajor.bind(this);
        this.onChangeGrade = this.onChangeGrade.bind(this);
        this.onChangeClass = this.onChangeClass.bind(this);
        this.onChangeWorkNumber = this.onChangeWorkNumber.bind(this);
        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
        this.onChangeInternship = this.onChangeInternship.bind(this);
        this.onChangeResearch = this.onChangeResearch.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            tutor: '',
            bio: '',
            age: '',
            major:'',
            grade:'',
            class:'',
            worknum:'',
            mobilenum:'',
            intern:'',
            research:'',
            username: '',
            picture:'',
            email:''

        }
    }
    // Form Events
    onChangeTutor(e) {
        this.setState({ tutor: e.target.value })
    }
    onChangeBio(e) {
        this.setState({ bio: e.target.value })
    }
    onChangeAge(e) {
        this.setState({ age: e.target.value })
    }
    onChangeMajor(e) {
      this.setState({ major: e.target.value })
  }
  onChangeGrade(e) {
      this.setState({ grade: e.target.value })
  }
  onChangeClass(e) {
      this.setState({ class: e.target.value })
  }
  onChangeWorkNumber(e) {
    this.setState({ worknum: e.target.value })
  }
  onChangeMobileNumber(e) {
      this.setState({ mobilenum: e.target.value })
  }
  onChangeInternship(e) {
    this.setState({ intern: e.target.value })
  }
  onChangeResearch(e) {
      this.setState({ research: e.target.value })
  }
    onSubmit(e) {
        e.preventDefault()
        this.setState({
          tutor: '',
          bio: '',
          age: '',
          major:'',
          grade:'',
          class:'',
          worknum:'',
          mobilenum:'',
          intern:'',
          research:'',
          username:'',
          picture:'',
          email:''
        })
    }
    // React Life Cycle
    componentDidMount() { 
      this.userData = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            this.setState({
                tutor: this.userData.tutor,
                bio: this.userData.bio,
                age: this.userData.age,
                major: this.userData.major,
                grade: this.userData.grade,
                class: this.userData.class,
                worknum: this.userData.worknum,
                mobilenum: this.userData.mobilenum,
                intern: this.userData.intern,
                research: this.userData.research,
                username: this.props.u_name,
                picture: this.props.pic,
                email: this.props.email

            })
        } else {
            this.setState({
              tutor: '',
              bio: '',
              age: '',
              major:'',
              grade:'',
              class:'',
              worknum:'',
              mobilenum:'',
              intern:'',
              research:'',
              username:'',
              picture:'',
              email:''
            })
        }
      }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }
    willUpdate(){
      var savebutton = document.getElementById('savebutton');
      var readonly = true;
      var inputs = document.querySelectorAll('input[type="text"]');
      savebutton.addEventListener('click',function(){
          
          for (var i=0; i<inputs.length; i++) {
          inputs[i].toggleAttribute('readonly');
          };

          if (savebutton.innerHTML == "edit") {
            savebutton.innerHTML = "save";
              } else {
            savebutton.innerHTML = "edit";
            }  
});
    }

  render() {
   return (
    <div className="container rounded bg-white mt-5 mb-5">
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px"src= {this.state.picture} ></img><span className="font-weight-bold"></span>{this.state.username}<span className="text-black-50">{this.state.email}</span><span> </span></div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile</h4>
                </div>
                <div className="row mt-2">
                <div className="col-md-6"><label className="labels" >Tutor</label><input type="text" className="form-control" value={this.state.tutor} onChange={this.onChangeTutor}  placeholder="Tutor (yes or no)"></input></div>
                    <div className="col-md-6"><label className="labels">Biography</label><input type="text" className="form-control" value={this.state.bio} onChange={this.onChangeBio}  placeholder="80 character bio"></input></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Age</label><input type="text" className="form-control" placeholder="how old are you" value={this.state.age} onChange={this.onChangeAge}></input></div>
                    <div className="col-md-12"><label className="labels">Major</label><input type="text" className="form-control" placeholder="what is your major" value={this.state.major} onChange={this.onChangeMajor}></input></div>
                    <div className="col-md-12"><label className="labels">Grade</label><input type="text" className="form-control" placeholder="what is your grade" value={this.state.grade} onChange={this.onChangeGrade}></input></div>
                    <div className="col-md-12"><label className="labels">Class</label><input type="text" className="form-control" placeholder="what class do you want to tutor/need help in" value={this.state.className} onChange={this.onChangeclassName}></input></div>
                    <div className="col-md-12"><label className="labels">Work Number</label><input type="text" className="form-control" placeholder="what is your work number" value={this.state.worknum} onChange={this.onChangeWorkNumber}></input></div>
                    <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="what is your mobile number" value={this.state.mobilenum} onChange={this.onChangeMobileNumber}></input></div>
                    </div>
                <div className="mt-5 text-center"><button  id="savebutton"className="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div>
                <div className="col-md-12"><label className="labels">Internships/Work</label><input type="text" className="form-control" placeholder="experience" value={this.state.intern} onChange={this.onChangeInternship}></input></div> 
                <div className="col-md-12"><label className="labels">Research</label><input type="text" className="form-control" placeholder="additional details" value={this.state.research} onChange={this.onChangeResearch}></input></div>
            </div>
        </div>
    </div>
</div>
  );
}
}

export const Prof = () => {
  const {user} = useAuth0();
  //console.log(user.nickname);
  console.log(user.nickname)

  return <Profile u_name={user.nickname} pic={user.picture} email = {user.email}/>
}


export default Prof;

