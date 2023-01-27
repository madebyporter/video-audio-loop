<template>
  <form @submit.prevent="submitFiles">
    <label>
      Upload Audio:
      <input type="file" accept="audio/*" ref="audioInput" />
    </label>
    <label>
      Upload Video:
      <input type="file" accept="video/*" ref="videoInput" />
    </label>
    <button type="submit">Generate</button>
  </form>
  <video v-if="videoUrl" controls>
    <source :src="videoUrl" type="video/mp4" />
  </video>
</template>

<script setup>
import { ref } from "vue";

const audioInput = ref(null);
const videoInput = ref(null);
const videoUrl = ref(null);

const submitFiles = async () => {
  const formData = new FormData();
  formData.append("audio", audioInput.value.files[0]);
  formData.append("video", videoInput.value.files[0]);

  const response = await fetch("/api/generate-looping-video", {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();
  videoUrl.value = URL.createObjectURL(blob);
};
</script>
