import React, { useState, useEffect } from 'react';
import { Slider, Progress, message } from 'antd';
import { UpdateProgress, GetProgress } from '../calls/progressCalls';

function ProgressBar({ taskId, initialProgress }) {
    const [progress, setProgress] = useState(initialProgress || 0);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await GetProgress(taskId);
                if (response.success) {
                    setProgress(response.data.completionPercentage);
                }
            } catch (error) {
                message.error('Failed to fetch progress');
            }
        };
        fetchProgress();
    }, [taskId]);

    const handleSliderChange = (value) => {
        setProgress(value);
    };

    const handleSliderAfterChange = async (value) => {
        try {
            await UpdateProgress(taskId, { completionPercentage: value });
            message.success('Progress updated successfully');
            setProgress(value); // Update UI immediately
        } catch (error) {
            message.error('Failed to update progress');
        }
    };

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