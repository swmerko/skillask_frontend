import React from 'react';
import {BaseComponent} from 'outlinejs/lib/components';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    overflowY: 'auto',
    marginBottom: 24
  }
};

export class UserSkillsResultsComponent extends BaseComponent {

  handleSupportUser(userSkill) {
    this.props.delegate.supportUser(userSkill);
  }

  render() {

    let results = this.props.userSkills.map(userSkill => {
      let tooltip = `Click here to support ${userSkill.userFullName} for the skill ${userSkill.skillName}.`;

      let star = '';
      if (this.request.user) {
        if (userSkill.supporters.indexOf(this.request.user.id) > -1) {
          star = <IconButton>
            <Star color="orange"/>
          </IconButton>;
        } else {
          star = <IconButton onClick={this.handleSupportUser.bind(this, userSkill)}>
            <StarBorder color="white"/>
          </IconButton>;
        }
      }


      return <GridTile
        key={userSkill.id}
        title={userSkill.userFullName}
        actionIcon={star}
        actionPosition="left"
        titlePosition="top"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        cols={1}
        rows={1}
        tooltip={tooltip}>
        <img src={userSkill.userProfileImageUrl}/>
      </GridTile>;
    });

    return <GridList cols={2}
                     padding={1}
                     style={styles.gridList}>
      {results}
    </GridList>;
  }
}
