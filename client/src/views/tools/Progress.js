import React from 'react'
import PropTypes from 'prop-types'

// Simply holds a progress bar (styled by bootstrap), used to display file upload progress 
const Progress = ({ percentage }) => {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${percentage}%` }}>
                {percentage}%
            </div>
        </div>
    )
}

Progress.propTypes = {
    percentage: PropTypes.number.isRequired
}

export default Progress
