<script context="module" lang="ts">
    export enum ButtonState {
        initial,
        started,
        paused,
        finished,
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { time } from "$lib/stores/timer";
	import IconButton from '@smui/icon-button';
    import { durationString } from "$lib/utils/time-format";

    // Props
    export let startValue: number;

    // Internal variables
    let running: boolean = false;
    let timerRef: ReturnType<typeof setInterval>;
    let buttonState: ButtonState = ButtonState.initial;

    // Internal state
    $: currentTime = startValue;

    // Mount hook
    onMount(() => {
        time.set(startValue);
    });

    // Timer controller methods
    const start = () => {
        if (running) return;

        timerRef = setInterval(() => {
            buttonState = ButtonState.started;
            time.update((value: number) => {
                return value - 1;
            });
        }, 1000);

        time.subscribe((value: number) => {
            currentTime = value;

            if (value === 0) {
                clearInterval(timerRef);
                buttonState = ButtonState.finished;
            }
        });

        running = true;
    };

    const pause = () => {
        if (timerRef) {
            clearInterval(timerRef);
            running = false;
            buttonState = ButtonState.paused;
        }
    };

    const reset = () => {
        pause();
        time.set(startValue);
        buttonState = ButtonState.initial;
    }
</script>


<div class="timer">
    <span class="time-display">{durationString(currentTime)}</span>
    <div class="button-row">

        {#if (buttonState === ButtonState.initial)}
        <IconButton class="material-icons" on:click={start}>
            play_arrow
        </IconButton>
        {:else if (buttonState === ButtonState.started)}
        <IconButton class="material-icons" on:click={pause}>
            pause
        </IconButton>
        <IconButton class="material-icons" on:click={reset}>
            replay
        </IconButton>
        {:else if (buttonState === ButtonState.paused)}
        <IconButton class="material-icons" on:click={start}>
            play_arrow
        </IconButton>
        <IconButton class="material-icons" on:click={reset}>
            replay
        </IconButton>
        {:else if (buttonState === ButtonState.finished)}
        <IconButton class="material-icons" on:click={reset}>
            replay
        </IconButton>
        {/if}
    </div>
</div>


<style>
    .timer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .time-display {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 3rem;

        height: 80px;
    }

    .button-row {
        display: flex;
        justify-content: space-between;
        width: 200px;
    }
</style>
