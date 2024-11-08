import React, { useState } from 'react';
import { Slider, Progress, message } from 'antd';
import { UpdateProgress } from '../calls/progressCalls';
import { useSelector } from 'react-redux';

function ProgressBar({ taskId, initialProgress }) {
    const [progress, setProgress] = useState(initialProgress);
    const { user } = useSelector(state => state.user);

    const handleSliderChange = value => {
        setProgress(value);
    }

    const handleSliderAfterChange = async (value) => {
        try{
            await UpdateProgress(taskId, value, user);
            message.success('Progress updated successfully');
        }
        catch(error){
            message.error(error.message);
        }
    }

    return (
        <div>
            <Progress percent={progress} />
            <Slider
                min={0}
                max={100}
                onChange={handleSliderChange}
                onAfterChange={handleSliderAfterChange}
                value={progress}
            />
        </div>
    );
}

export default ProgressBar;