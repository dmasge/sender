<script>
    export let onClick = "";
    export let uid = "";
    export let prevUnixTimestamp;

    let curUnixTimestamp = Math.floor(new Date().valueOf() / 1000);
    let timeDiff = curUnixTimestamp - prevUnixTimestamp;
    let timeLeft = 600 - timeDiff;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let buttonText = `Refresh`;
    let disabled = false;
    
    let cooldown = 60;
    const updateButton = () => {
        curUnixTimestamp = Math.floor(new Date().valueOf() / 1000);
        timeDiff = curUnixTimestamp - prevUnixTimestamp;
        timeLeft = cooldown - timeDiff;
        minutes = Math.floor(timeLeft / 60);
        seconds = timeLeft % 60;
        if (timeDiff < cooldown) {
            buttonText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            disabled = true;
            setTimeout(updateButton, 1000);
        } else {
            buttonText = `Refresh`;
            disabled = false;
        }
    }
    
    if (timeDiff < cooldown) {
        updateButton();
    }
</script>

<form method="POST" on:submit={onClick} id="myForm" >
    <div style="width: 100%; display:flex; justify-content: center;">
        <button
            type="submit"
            style="text-shadow: none;"
            name="uid"
            value={uid}
            disabled={disabled}
        ><p>{buttonText}</p></button>
    </div>
</form>

<style>
    p {
        margin: 0;
    }
</style>


