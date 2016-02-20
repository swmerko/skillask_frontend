import { BaseView } from 'outlinejs/views';
import React from 'react';
import { gettext } from 'outlinejs/utils/translation';
import { SearchInputView } from '../search/components';


export class ProfileView extends BaseView {
  render() {

    return <div>

      <section className="bg-primary" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 text-center">
              <h2 className="section-heading">Questo è il tuo profilo { this.props.currentUser.firstName }</h2>
              <hr className="light"/>

              <h2>blablabla</h2>

            </div>
          </div>
        </div>
      </section>

    </div>;
  }
}


export class AddSkillView extends BaseView {

  handleSelect(skill) {
    console.log('select', skill);
    this.controller.addUserSkill(skill.id);
  }

  handleRemoveSkill(userSkill) {
    console.log('delete', userSkill);
    this.controller.removeUserSkill(userSkill.id);
  }

  render() {
    let userSkills;

    console.log('le skill dell utente');

    if (this.props.userSkills.length > 0) {
      userSkills = <ul>
        {
          this.props.userSkills.map((userSkill) => {
            return <div key={ userSkill.id } className="col-lg-3 col-md-6 skill-profile-box text-center">
              <div className="skill-box-text">

                { userSkill.skillName }
                <span onClick={ this.handleRemoveSkill.bind(this, userSkill)} class="badge pull-right"> x</span>
              </div>
            </div>;
          })
        }
      </ul>;
    } else {
      userSkills = <p>{ gettext('Non hai ancora inserito skill') }</p>;
    }


    return <div>

      <section className="bg-primary" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
              <h2 className="section-heading">{ gettext('Cosa sai fare? Aggiungi le tue skills') }</h2>
              <hr className="light"/>

              <SearchInputView controller={ this.controller } handleSelect={ this.handleSelect }/>

            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">

            <div className="col-lg-12">
              { userSkills }
            </div>
          </div>
        </div>
      </section>

    </div>;
  }
}
