import React from 'react';

function Copyright(props) {

  return (
    <div className="micro" style={styles.copyright}>
      <p>
        Certain software code for the FlappyBird demo is protected by third party copyright and licensed to Optimizely under the <a href="https://github.com/KiraYo4kage/React-flappy-bird/blob/master/LICENSE" target="_blank">MIT License</a>. <br /> FlappyBird is a registered trademark of its respective rights-holders and use by Optimizely does not imply any affiliation with or endorsement by such parties.
      </p>
      <p>
        Made with ❤️  by <a href="https://twitter.com/asametrical" target="_blank">Asa Schachar</a>
      </p>
    </div>
  )
}

const styles = {
  copyright: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}

export default Copyright
